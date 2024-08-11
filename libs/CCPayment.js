const libName = "CCPaymentLibs";
const libPrefix = "ccpaymentlibs_";

function setAppId(appId) {
    if (!appId) {
        throw libName + ": 'setAppId' require appId for setup";
    }
    Bot.setProperty(libPrefix + "appid", appId, "string");
}

function setAppSecret(appSecret) {
    if (!appSecret) {
        throw libName + ": 'setAppSecret' require appSecret for setup";
    }
    Bot.setProperty(libPrefix + "appsecret", appSecret, "string");
}

function getAppId() {
    const appId = Bot.getProperty(libPrefix + "appid", null);
    if (!appId) {
        throw libName + ": appId is not set. Please setup first";
    }
    return appId;
}

function getAppSecret() {
    const appSecret = Bot.getProperty(libPrefix + "appsecret", null);
    if (!appSecret) {
        throw libName + ": appSecret is not set. Please setup first";
    }
    return appSecret;
}

function validateParams(options, requiredParams) {
    for (const param of requiredParams) {
        if (!options.body[param]) {
            throw libName + ": '/" + options.path + "' requires options.body." + param;
        }
    }
}

function createTimestamp(threshold = 0) {
    return Math.floor(Date.now() / 1000) + threshold;
}

function apiCall(options) {
    options.headers = {
        "Content-Type": "application/json",
        "Accept": "application/json;charset=utf-8",
        ...options.headers
    }

    HTTP[options.method]({
        url: options.url,
        headers: options.headers,
        body: options.body,
        success: libPrefix + "onApiResponse " + options.onSuccess,
        error: libPrefix + "onApiError",
        ...options
    });
}

function onApiResponse() {
    const options = JSON.parse(content);
    Bot.runCommand(params, options);
}

function onApiError() {
    throw content;
}

class V1Api {
    constructor() {
        this.version = 1;
        this.baseUrl = "https://admin.ccpayment.com/ccpayment/v1/";
        this.payment = new V1PaymentAPI(this);
        this.wallet = new V1WalletAPI(this);
        this.withdrawal = new V1WithdrawalAPI(this);
        this.resources = new V1ResourcesAPI(this);
    }

    _SHA256(input) {
        return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
    }

    _post(options) {
        options.body = JSON.stringify(options.body) || "";

        const appId = getAppId();
        const appSecret = getAppSecret();
        const timestamp = createTimestamp();
        const signature = this._SHA256(appId + appSecret + timestamp + options.body);

        options.url = String(this.baseUrl + options.path);
        options.method = "post";
        options.headers = {};
        options.headers["Appid"] = appId;
        options.headers["Timestamp"] = timestamp;
        options.headers["Sign"] = signature;

        apiCall(options);
    }
}

class V1PaymentAPI {
    constructor(apiInstance) {
        this.apiInstance = apiInstance;
    }

    createHostedInvoice(options) {
        options.path = "concise/url/get";
        validateParams(options, ["product_price", "merchant_order_id", "product_name"]);
        this.apiInstance._post(options);
    }

    createNativeInvoice(options) {
        options.path = "bill/create";
        validateParams(options, ["product_price", "merchant_order_id", "token_id", "denominated_currency"]);
        this.apiInstance._post(options);
    }

    getInvoiceDetail(options) {
        options.path = "bill/info";
        validateParams(options, ["merchant_order_id"]);
        this.apiInstance._post(options);
    }
}

class V1WalletAPI {
    constructor(apiInstance) {
        this.apiInstance = apiInstance;
    }

    createPermanentAddress(options) {
        options.path = "payment/address/get";
        validateParams(options, ["user_id", "chain"]);
        this.apiInstance._post(options);
    }
}

class V1WithdrawalAPI {
    constructor(apiInstance) {
        this.apiInstance = apiInstance;
    }

    createWithdrawal(options) {
        options.path = "withdrawal";
        validateParams(options, ["merchant_order_id", "address", "token_id", "value"]);
        this.apiInstance._post(options);
    }

    getWithdrawalDetail(options) {
        options.path = "bill/info";
        validateParams(options, ["merchant_order_ids"]);
        this.apiInstance._post(options);
    }
}

class V1ResourcesAPI {
    constructor(apiInstance) {
        this.apiInstance = apiInstance;
    }

    getSupportedCoins(options) {
        options.path = "coin/all";
        this.apiInstance._post(options);
    }

    calculateTokenRate(options) {
        options.path = "token/rate";
        validateParams(options, ["amount", "token_id"]);
        this.apiInstance._post(options);
    }

    getBalance(options) {
        options.path = "assets";
        this.apiInstance._post(options);
    }

    getNetworkFee(options) {
        options.path = "network/fee";
        validateParams(options, ["token_id"]);
        this.apiInstance._post(options);
    }

    getBlockHeight(options) {
        options.path = "get/network/height/info";
        this.apiInstance._post(options);
    }

    validateCWalletId(options) {
        options.path = "check/user";
        validateParams(options, ["c_id"]);
        this.apiInstance._post(options);
    }
}

class V2Api {
    constructor() {
        this.version = 2;
        this.baseUrl = "https://ccpayment.com/ccpayment/v2/";
        this.common = new V2CommonAPI(this);
        this.merchant = new V2MerchantAPI(this);
        this.walletSystem = new V2WalletSystemAPI(this);
    }

    _hmacSHA256(input, secretKey) {
        return CryptoJS.HmacSHA256(input, secretKey).toString(CryptoJS.enc.Hex);
    }

    _post(options) {
        options.body = JSON.stringify(options.body) || "";
        
        const appId = getAppId();
        const appSecret = getAppSecret();
        const timestamp = createTimestamp();
        const signature = this._hmacSHA256(String(appId + timestamp + options.body), appSecret);

        options.url = String(this.baseUrl + options.path);
        options.method = "post";
        options.headers = {};
        options.headers["Appid"] = appId;
        options.headers["Timestamp"] = timestamp.toString();
        options.headers["Sign"] = signature;

        apiCall(options);
    }
}

class V2CommonAPI {
    constructor(apiInstance) {
        this.apiInstance = apiInstance;
    }

    getTokenList(options) {
        options.path = "getCoinList";
        this.apiInstance._post(options);
    }

    getTokenInformation(options) {
        options.path = "getCoin";
        validateParams(options, ["coinId"]);
        this.apiInstance._post(options);
    }

    getTokenPrice(options) {
        options.path = "getCoinUSDTPrice";
        validateParams(options, ["coinIds"]);
        this.apiInstance._post(options);
    }

    getCWalletUserInfo(options) {
        options.path = "getCwalletUserId";
        validateParams(options, ["cwalletUserId"]);
        this.apiInstance._post(options);
    }

    getWithdrawFee(options) {
        options.path = "getWithdrawFee";
        validateParams(options, ["coinId", "chain"]);
        this.apiInstance._post(options);
    }

    getFiatList(options) {
        options.path = "getFiatList";
        this.apiInstance._post(options);
    }

    getChainList(options) {
        options.path = "getChainList";
        this.apiInstance._post(options);
    }
}

class V2MerchantAPI {
    constructor(apiInstance) {
        this.apiInstance = apiInstance;
    }

    getBalanceList(options) {
        options.path = "getAppCoinAssetList";
        this.apiInstance._post(options);
    }

    getCoinBalance(options) {
        options.path = "getAppCoinAsset";
        validateParams(options, ["coinId"]);
        this.apiInstance._post(options);
    }

    createInvoice(options) {
        options.path = "createAppOrderDepositAddress";
        validateParams(options, ["coinId", "price", "chain", "orderId"]);
        this.apiInstance._post(options);
    }

    getInvoiceDetail(options) {
        options.path = "getAppOrderInfo";
        validateParams(options, ["orderId"]);
        this.apiInstance._post(options);
    }

    createPermanentAddress(options) {
        options.path = "getOrCreateAppDepositAddress";
        validateParams(options, ["referenceId", "chain"]);
        this.apiInstance._post(options);
    }

    getDepositRecord(options) {
        options.path = "getAppDepositRecord";
        validateParams(options, ["recordId"]);
        this.apiInstance._post(options);
    }

    getDepositRecordList(options) {
        options.path = "getAppDepositRecordList";
        this.apiInstance._post(options);
    }

    externalWithdraw(options) {
        options.path = "applyAppWithdrawToNetwork";
        validateParams(options, ["coinId", "chain", "address", "orderId", "amount"]);
        this.apiInstance._post(options);
    }

    internalWithdraw(options) {
        options.path = "applyAppWithdrawToCwallet";
        validateParams(options, ["coinId", "cwalletUser", "orderId", "amount"]);
        this.apiInstance._post(options);
    }

    getWithdrawalRecord(options) {
        options.path = "getAppWithdrawRecord";
        this.apiInstance._post(options);
    }

    getWithdrawalRecordList(options) {
        options.path = "getAppWithdrawRecordList";
        this.apiInstance._post(options);
    }
    
    getSwapQuote(options) {
        options.path = "estimate";
        validateParams(options, ["coinIdIn", "amountIn", "coinIdOut"]);
        this.apiInstance._post(options);
    }
    
    createSwapOrder(options) {
        options.path = "swap";
        validateParams(options, ["orderId", "coinIdIn", "amountIn", "coinIdOut"]);
        this.apiInstance._post(options);
    }
    
    getSwapRecord(options) {
        options.path = "getSwapRecord";
        this.apiInstance._post(options);
    }
    
    getSwapRecordList(options) {
        options.path = "getSwapRecordList";
        this.apiInstance._post(options);
    }
}

class V2WalletSystemAPI {
    constructor(apiInstance) {
        this.apiInstance = apiInstance;
    }

    getUserBalanceList(options) {
        options.path = "getUserCoinAssetList";
        validateParams(options, ["userId"]);
        this.apiInstance._post(options);
    }

    getUserBalance(options) {
        options.path = "getUserCoinAsset";
        validateParams(options, ["userId", "coinId"]);
        this.apiInstance._post(options);
    }

    getUserDepositAddress(options) {
        options.path = "getOrCreateUserDepositAddress";
        validateParams(options, ["userId", "chain"]);
        this.apiInstance._post(options);
    }

    getUserDepositRecord(options) {
        options.path = "getUserDepositRecord";
        validateParams(options, ["recordId"]);
        this.apiInstance._post(options);
    }

    getUserDepositRecordList(options) {
        options.path = "getUserDepositRecordList";
        validateParams(options, ["userId"]);
        this.apiInstance._post(options);
    }

    externalUserWithdraw(options) {
        options.path = "applyUserWithdrawToNetwork";
        validateParams(options, ["userId", "coinId", "chain", "address", "orderId", "amount"]);
        this.apiInstance._post(options);
    }

    internalUserWithdraw(options) {
        options.path = "applyUserWithdrawToCwallet";
        validateParams(options, ["userId", "coinId", "cwalletUser", "orderId", "amount"]);
        this.apiInstance._post(options);
    }

    getUserWithdrawalRecord(options) {
        options.path = "getUserWithdrawRecord";
        this.apiInstance._post(options);
    }

    getUserWithdrawalRecordList(options) {
        options.path = "getUserWithdrawRecordList";
        validateParams(options, ["userId"]);
        this.apiInstance._post(options);
    }

    internalUserTransfer(options) {
        options.path = "userTransfer";
        validateParams(options, ["fromUserId", "toUserId", "coinId", "amount", "orderId"]);
        this.apiInstance._post(options);
    }

    getUserTransferRecord(options) {
        options.path = "getUserTransferRecord";
        validateParams(options, ["fromUserId", "toUserId", "coinId", "orderId", "amount"]);
        this.apiInstance._post(options);
    }

    getUserTransferRecordList(options) {
        options.path = "getUserTransferRecordList";
        validateParams(options, ["fromUserId", "toUserId"]);
        this.apiInstance._post(options);
    }
    
    createUserSwapOrder(options) {
        options.path = "userSwap";
        validateParams(options, ["orderId", "userId", "coinIdIn", "amountIn", "coinIdOut"]);
        this.apiInstance._post(options);
    }
    
    getUserSwapRecord(options) {
        options.path = "getUserSwapRecord";
        this.apiInstance._post(options);
    }
    
    getUserSwapRecordList(options) {
        options.path = "getUserSwapRecordList";
        this.apiInstance._post(options);
    }
}

publish({
    setAppId: setAppId,
    getAppId: getAppId,
    setAppSecret: setAppSecret,
    getAppSecret: getAppSecret,
    v1: new V1Api(),
    v2: new V2Api()
});

on(libPrefix + "onApiResponse", onApiResponse);
on(libPrefix + "onApiError", onApiError);
