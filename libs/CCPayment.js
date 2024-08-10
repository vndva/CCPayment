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
        url: options.url + options.path,
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

        options.url = this.baseUrl;
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
        validateParams(options, ["product_price", "merchant_order_id", "product_name"]);
        options.path = "concise/url/get";
        this.apiInstance._post(options);
    }

    createNativeInvoice(options) {
        validateParams(options, ["product_price", "merchant_order_id", "token_id", "denominated_currency"]);
        options.path = "bill/create";
        this.apiInstance._post(options);
    }

    getInvoiceDetail(options) {
        validateParams(options, ["merchant_order_id"]);
        options.path = "bill/info";
        this.apiInstance._post(options);
    }
}

class V1WalletAPI {
    constructor(apiInstance) {
        this.apiInstance = apiInstance;
    }

    createPermanentAddress(options) {
        validateParams(options, ["user_id", "chain"]);
        options.path = "payment/address/get";
        this.apiInstance._post(options);
    }
}

class V1WithdrawalAPI {
    constructor(apiInstance) {
        this.apiInstance = apiInstance;
    }

    createWithdrawal(options) {
        validateParams(options, ["merchant_order_id", "address", "token_id", "value"]);
        options.path = "withdrawal";
        this.apiInstance._post(options);
    }

    getWithdrawalDetail(options) {
        validateParams(options, ["merchant_order_ids"]);
        options.path = "bill/info";
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
        validateParams(options, ["amount", "token_id"]);
        options.path = "token/rate";
        this.apiInstance._post(options);
    }

    getBalance(options) {
        options.path = "assets";
        this.apiInstance._post(options);
    }

    getNetworkFee(options) {
        validateParams(options, ["token_id"]);
        options.path = "network/fee";
        this.apiInstance._post(options);
    }

    getBlockHeight(options) {
        options.path = "get/network/height/info";
        this.apiInstance._post(options);
    }

    validateCWalletId(options) {
        validateParams(options, ["c_id"]);
        options.path = "check/user";
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

        options.url = this.baseUrl;
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
        validateParams(options, ["coinId"]);
        options.path = "getCoin";
        this.apiInstance._post(options);
    }

    getTokenPrice(options) {
        validateParams(options, ["coinIds"]);
        options.path = "getCoinUSDTPrice";
        this.apiInstance._post(options);
    }

    getCWalletUserInfo(options) {
        validateParams(options, ["cwalletUserId"]);
        options.path = "getCwalletUserId";
        this.apiInstance._post(options);
    }

    getWithdrawFee(options) {
        validateParams(options, ["coinId", "chain"]);
        options.path = "getWithdrawFee";
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
        validateParams(options, ["coinId"]);
        options.path = "getAppCoinAsset";
        this.apiInstance._post(options);
    }

    createInvoice(options) {
        validateParams(options, ["coinId", "price", "chain", "orderId"]);
        options.path = "createAppOrderDepositAddress";
        this.apiInstance._post(options);
    }

    getInvoiceDetail(options) {
        validateParams(options, ["orderId"]);
        options.path = "getAppOrderInfo";
        this.apiInstance._post(options);
    }

    createPermanentAddress(options) {
        validateParams(options, ["referenceId", "chain"]);
        options.path = "getOrCreateAppDepositAddress";
        this.apiInstance._post(options);
    }

    getDepositRecord(options) {
        validateParams(options, ["recordId"]);
        options.path = "getAppDepositRecord";
        this.apiInstance._post(options);
    }

    getDepositRecordList(options) {
        options.path = "getAppDepositRecordList";
        this.apiInstance._post(options);
    }

    externalWithdraw(options) {
        validateParams(options, ["coinId", "chain", "address", "orderId", "amount"]);
        options.path = "applyAppWithdrawToNetwork";
        this.apiInstance._post(options);
    }

    internalWithdraw(options) {
        validateParams(options, ["coinId", "cwalletUser", "orderId", "amount"]);
        options.path = "applyAppWithdrawToCwallet";
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
}

class V2WalletSystemAPI {
    constructor(apiInstance) {
        this.apiInstance = apiInstance;
    }

    getUserBalanceList(options) {
        validateParams(options, ["userId"]);
        options.path = "getUserCoinAssetList";
        this.apiInstance._post(options);
    }

    getUserBalance(options) {
        validateParams(options, ["userId", "coinId"]);
        options.path = "getUserCoinAsset";
        this.apiInstance._post(options);
    }

    getUserDepositAddress(options) {
        validateParams(options, ["userId", "chain"]);
        options.path = "getOrCreateUserDepositAddress";
        this.apiInstance._post(options);
    }

    getUserDepositRecord(options) {
        validateParams(options, ["recordId"]);
        options.path = "getUserDepositRecord";
        this.apiInstance._post(options);
    }

    getUserDepositRecordList(options) {
        validateParams(options, ["userId"]);
        options.path = "getUserDepositRecordList";
        this.apiInstance._post(options);
    }

    externalWithdraw(options) {
        validateParams(options, ["userId", "coinId", "chain", "address", "orderId", "amount"]);
        options.path = "applyUserWithdrawToNetwork";
        this.apiInstance._post(options);
    }

    internalWithdraw(options) {
        validateParams(options, ["userId", "coinId", "cwalletUser", "orderId", "amount"]);
        options.path = "applyUserWithdrawToCwallet";
        this.apiInstance._post(options);
    }

    getWithdrawalRecord(options) {
        options.path = "getUserWithdrawRecord";
        this.apiInstance._post(options);
    }

    getWithdrawalRecordList(options) {
        validateParams(options, ["userId"]);
        options.path = "getUserWithdrawRecordList";
        this.apiInstance._post(options);
    }

    internalTransfer(options) {
        options.path = "userTransfer";
        this.apiInstance._post(options);
    }

    getTransferRecord(options) {
        validateParams(options, ["fromUserId", "toUserId", "coinId", "orderId", "amount"]);
        options.path = "getUserTransferRecord";
        this.apiInstance._post(options);
    }

    getTransferRecordList(options) {
        validateParams(options, ["fromUserId", "toUserId"]);
        options.path = "getUserTransferRecordList";
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