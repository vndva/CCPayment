# CCPaymentLibs
A simple library for interacting with the CCPayment official API within Bots.Business client.

## What is CCPayment?
[CCPayment](https://ccpayment.com) is a payment gateway that facilitates the processing of Bitcoin, Ethereum, and other cryptocurrencies. It utilizes a unique unified payment API that can be easily integrated with any website or e-commerce platform; hence, businesses can accept 45+ cryptocurrencies via a single checkout page.

CCPayment allows you send and receive payments in crypto from your friends and family around the world. Whether your customers use CCPayment or not, we create a contactless, seamless and secure checkout experience. Make crypto payments to anyone and collect crypto payments with ease.

- Read more: [v1 API docs](https://ccpayment.com/payment-doc-v1/)
- Read more: [v2 API docs](https://ccpayment.com/api/doc?en#introduction)

## Feature
- [x] Supports both v1 and v2 API
- [x] Get supported token list
- [x] Get supported chain list
- [x] Get token price
- [x] Query merchant balance
- [x] Calculate token rate
- [x] Get network fee
- [x] Generate permanent deposit address
- [x] Create hosted checkout page
- [x] Create native checkout invoice
- [x] Create external withdrawal
- [x] Create internal transfer between CWallet user
- [x] Create swap order
- [x] Get swap quote
- [x] Get swap record

## Documentation & flow
- [Usage](#Usage)
- [v1 API class](#Version-1-API)
  - [Payment](#Payment-API)
    - [createHostedInvoice](#1-createHostedInvoice)
    - [createNativeInvoice](#2-createNativeInvoice)
    - [getInvoiceDetail](#3-getInvoiceDetail)
  - [Wallet](#Wallet-API)
    - [createPermanentAddress](#1-createPermanentAddress)
  - [Withdrawal](#Withdrawal-API)
    - [createWithdrawal](#1-createWithdrawal)
    - [getWithdrawalDetail](#2-getWithdrawalDetail)
  - [Resources](#Resources-API)
    - [getSupportedCoins](#1-getSupportedCoins)
    - [calculateTokenRate](#2-calculateTokenRate)
    - [getBalance](#3-getBalance)
    - [getNetworkFee](#4-getNetworkFee)
    - [getBlockHeight](#5-getBlockHeight)
    - [validateCWalletId](#6-validateCWalletId)
- [v2 API class](#Version-2-API)
  - [Common](#Common-API)
    - [getTokenList](#1-getTokenList)
    - [getTokenInformation](#2-getTokenInformation)
    - [getTokenPrice](#3-getTokenPrice)
    - [getCWalletUserInfo](#4-getCWalletUserInfo)
    - [getWithdrawFee](#5-getWithdrawFee)
    - [getFiatList](#6-getFiatList)
    - [getChainList](#7-getChainList)
  - [Merchant](#Merchant-API)
    - [getBalanceList](#1-getBalanceList)
    - [getCoinBalance](#2-getCoinBalance)
    - [createInvoice](#3-createInvoice)
    - [getInvoiceDetail](#4-getInvoiceDetail)
    - [createPermanentAddress](#5-createPermanentAddress)
    - [getDepositRecord](#6-getDepositRecord)
    - [getDepositRecordList](#7-getDepositRecordList)
    - [externalWithdraw](#8-externalWithdraw)
    - [internalWithdraw](#9-internalWithdraw)
    - [getWithdrawalRecord](#10-getWithdrawalRecord)
    - [getWithdrawalRecordList](#11-getWithdrawalRecordList)
    - [getSwapQuote](#12-getSwapQuote)
    - [createSwapOrder](#13-createSwapOrder)
    - [getSwapRecord](#14-getSwapRecord)
    - [getSwapRecordList](#15-getSwapRecordList)
  - [Wallet system](#Wallet-system-API)
    - [getUserBalanceList](#1-getUserBalanceList)
    - [getUserBalance](#2-getUserBalance)
    - [getUserDepositAddress](#3-getUserDepositAddress)
    - [getUserDepositRecord](#4-getUserDepositRecord)
    - [getUserDepositRecordList](#5-getUserDepositRecordList)
    - [externalUserWithdraw](#6-externalWithdraw)
    - [internalUserWithdraw](#7-internalWithdraw)
    - [getUserWithdrawalRecord](#8-getWithdrawalRecord)
    - [getUserWithdrawalRecordList](#9-getWithdrawalRecordList)
    - [internalUserTransfer](#10-internalTransfer)
    - [getUserTransferRecord](#11-getTransferRecord)
    - [getUserTransferRecordList](#12-getTransferRecordList)
    - [createUserSwapOrder](#13-createUserSwapOrder)
    - [getUserSwapRecord](#14-getUserSwapRecord)
    - [getUserSwapRecordList](#15-getUserSwapRecordList)
- [Contact](#Contact-me)

## Set this repo to your bot 
![set-repo-url](static/set-repo-url.jpg)
[Back](#documentation--flow)

## Import the lib into your bot
![import-from-repo](static/import-from-repo.jpg)
[Back](#documentation--flow)
 
## Usage

### Import class & function
```js
/**
 * CMDS: @
 */ 
const {
  setAppId,
  setAppSecret,
  v1, v2
} = Libs.CCPayment;

const { payment, wallet, withdrawal, resources } = v1;
const { common, merchant, walletSystem } = v2;

// or legacy
Libs.CCPayment.setAppId("yourAppIdAbc123");
Libs.CCPayment.setAppSecret("abcdef01234567901");
Libs.CCPayment.v1.classes.someMethod();
Libs.CCPayment.v2.classes.someMethod();
```
[Back](#documentation--flow)

### Setup
```js
/**
 * CMDS: /setup
 */
Libs.CCPayment.setAppId("yourAppIdAbc123");
Libs.CCPayment.setAppSecret("abcdef01234567901");

Bot.sendMessage("CCPayment: setup success.");
```
[Back](#documentation--flow)

## Version 1 API
Official documentation: https://ccpayment.com/payment-doc-v1/

### Payment API

#### 1. createHostedInvoice

_Reference: **[Hosted checkout page integration](https://doc.ccpayment.com/ccpayment-v1.0-api/payment-api-ccpayment/hosted-checkout-page-integration)**_

|Name|Required|Type|
|----|--------|----|
|`product_name`|Yes|`string`|
|`product_price`|Yes|`string`|
|`merchant_order_id`|Yes|`string`|
|`order_valid_period`|No|`integer`|
|`return_url`|No|`string`|
|`notify_url`|No|`string`|
|`custom_value`|No|`string`|

```js
payment.createHostedInvoice({
  body: {
    product_name: "Some product name #123",
    product_price: "1",
    merchant_order_id: "some_order_id_123",
    // order_valid_period: 3600,
    // return_url: "https://example.com/",
    // notify_url: "https://notice.example.com",
    // custom_value: "some_custom_value"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 2. createNativeInvoice

_Reference: **[Native checkout integration](https://doc.ccpayment.com/ccpayment-v1.0-api/payment-api-ccpayment/native-checkout-integration)**_

|Name|Required|Type|
|----|--------|----|
|`token_id`|Yes|`string`|
|`product_price`|Yes|`string`|
|`merchant_order_id`|Yes|`string`|
|`denominated_currency`|Yes|`string`|
|`remark`|No|`string`|
|`order_valid_period`|No|`integer`|
|`notify_url`|No|`string`|
|`custom_value`|No|`string`|

```js
payment.createNativeInvoice({
  body: {
    token_id: "0912e09a-d8e2-41d7-a0bc-a25530892988",
    product_price: "1",
    merchant_order_id: "some_order_id_123",
    denominated_currency: "USD",
    // remark: "some_remark",
    // order_valid_period: 3600
    // notify_url: "https://notice.example.com",
    // custom_value: "some_custom_value"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 3. getInvoiceDetail

_Reference: **[Deposit order information](https://doc.ccpayment.com/ccpayment-v1.0-api/payment-api-ccpayment/api-deposit-order-information-interface)**_

|Name|Required|Type|
|----|--------|----|
|`merchant_order_ids`|Yes|`string[]`|

```js
payment.getInvoiceDetail({
  body: {
    merchant_order_ids: ["some_order_id_123", "some_order_id_456"]
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

### Wallet API

#### 1. createPermanentAddress

_Reference: **[Get permanent deposit address](https://doc.ccpayment.com/ccpayment-v1.0-api/wallet-api-ccpayment/get-permanent-deposit-address-for-users)**_

|Name|Required|Type|
|----|--------|----|
|`user_id`|Yes|`string`|
|`chain`|Yes|`string`|
|`notify_url`|No|`string`|

```js
wallet.createPermanentAddress({
  body: {
    user_id: "some_unique_user_id_123",
    chain: "some_chain_name",
    // notify_url: "https://notice.example.com"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

### Withdrawal API

#### 1. createWithdrawal

_Reference: **[Create a withdrawal order](https://doc.ccpayment.com/ccpayment-v1.0-api/withdrawal-api-integration/create-a-withdrawal-order)**_

|Name|Required|Type|
|----|--------|----|
|`merchant_order_id`|Yes|`string`|
|`address`|Yes|`string`|
|`token_id`|Yes|`string`|
|`value`|Yes|`string`|
|`memo`|No|`string`|
|`merchant_pays_fee`|No|`boolean`|

```js
withdrawal.createWithdrawal ({
  body: {
    merchant_order_id: "some_order_id_123",
    address: "0xSomeWalletAddress",
    token_id: "0912e09a-d8e2-41d7-a0bc-a2553089298",
    value: "1",
    // memo: "some_address_memo",
    // merchant_pays_fee: false
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 2. getWithdrawalDetail

_Reference: **[Withdrawal order information](https://doc.ccpayment.com/ccpayment-v1.0-api/withdrawal-api-integration/withdrawal-order-information-interface)**_

|Name|Required|Type|
|----|--------|----|
|`merchant_order_ids`|Yes|`string[]`|

```js
withdrawal.getWithdrawalDetail({
  body: {
    merchant_order_ids: ["order_id_123", "order_id_456"]
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

### Resources API

#### 1. getSupportedCoins

_Reference: **[Token ID interface](https://doc.ccpayment.com/ccpayment-v1.0-api/resources-document/token-id-interface)**_

|Name|Required|Type|
|----|--------|----|
|No parameter required|-|-|

```js
resources.getSupportedCoins({
  // no parameter required
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 2. calculateTokenRate

_Reference: **[Current token rate interface](https://doc.ccpayment.com/ccpayment-v1.0-api/resources-document/current-token-rate-interface)**_

|Name|Required|Type|
|----|--------|----|
|`amount`|Yes|`string`|
|`token_id`|Yes|`string`|

```js
resources.calculateTokenRate({
  body: {
    amount: "1",
    token_id: "0912e09a-d8e2-41d7-a0bc-a2553089298"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 3. getBalance

_Reference: **[Asset balance interface](https://doc.ccpayment.com/ccpayment-v1.0-api/resources-document/asset-balance-interface)**_

|Name|Required|Type|
|----|--------|----|
|`coin_id`|No|`string`|

```js
resources.getBalance({
  body: {
    // coin_id: "8e5741cf-6e51-4892-9d04-3d40e1dd0128"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 4. getNetworkFee

_Reference: **[Network fee interface](https://doc.ccpayment.com/ccpayment-v1.0-api/resources-document/network-fee-interface)**_

|Name|Required|Type|
|----|--------|----|
|`token_id`|No|`string`|
|`address`|No|`string`|

```js
resources.getNetworkFee({
  body: {
    token_id: "0912e09a-d8e2-41d7-a0bc-a2553089298",
    // address: "0xSomeWalletAddress"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 5. getBlockHeight

_Reference: **[Block height information retrieval](https://doc.ccpayment.com/ccpayment-v1.0-api/resources-document/block-height-information-retrieval-api)**_

|Name|Required|Type|
|----|--------|----|
|No parameter required|-|-|

```js
resources.getBlockHeight({
  // no parameter required
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 6. validateCWalletId

_Reference: **[Check CWallet validity](https://doc.ccpayment.com/ccpayment-v1.0-api/resources-document/check-the-validity-of-cwallet-id)**_

|Name|Required|Type|
|----|--------|----|
|`c_id`|Yes|`string`|

```js
resources.validateCWalletId({
  body: {
    c_id: "9454818"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

## Version 2 API
Official documentation: https://ccpayment.com/api/doc?en#introduction

### Common API

#### 1. getTokenList

_Reference: **[Get token list](https://ccpayment.com/api/doc?en#get-token-list)**_

|Name|Required|Type|
|----|--------|----|
|No parameter required|-|-|

```js
common.getTokenList({
  // no parameter required
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 2. getTokenInformation

_Reference: **[Get token information](https://ccpayment.com/api/doc?en#get-token-information)**_

|Name|Required|Type|
|----|--------|----|
|`coinId`|Yes|`integer`|

```js
common.getTokenInformation({
  body: {
    coinId: 1280
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 3. getTokenPrice

_Reference: **[Get token price](https://ccpayment.com/api/doc?en#get-token-price)**_

|Name|Required|Type|
|----|--------|----|
|`coinIds`|Yes|`integer[]`|

```js
common.getTokenPrice({
  body: {
    coinIds: [1280, 1234]
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 4. getCWalletUserInfo

_Reference: **[Get CWallet user information](https://ccpayment.com/api/doc?en#get-cwallet-user-information)**_

|Name|Required|Type|
|----|--------|----|
|`cwalletUserId`|Yes|`string`|

```js
common.getCWalletUserInfo({
  body: {
    cwalletUserId: "9558861"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 5. getWithdrawFee

_Reference: **[Get withdrawal network fee](https://ccpayment.com/api/doc?en#get-withdrawal-network-fee)**_

|Name|Required|Type|
|----|--------|----|
|`coinId`|Yes|`integer`|
|`chain`|Yes|`string`|

```js
common.getWithdrawFee({
  body: {
    coinId: 1280,
    chain: "POLYGON"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 6. getFiatList

_Reference: **[Get fiat list](https://ccpayment.com/api/doc?en#get-fiat-list)**_

|Name|Required|Type|
|----|--------|----|
|No parameter required|-|-|

```js
common.getFiatList({
  // no parameter required
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 7. getChainList

_Reference: **[Get chain list](https://ccpayment.com/api/doc?en#get-chain-list)**_

|Name|Required|Type|
|----|--------|----|
|`chains`|No|`string[]`|

```js
common.getChainList({
  body: {
    // chains: ["ETH", "POLYGON", "BSC"]
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

### Merchant API

#### 1. getBalanceList

_Reference: **[Get balance list](https://ccpayment.com/api/doc?en#get-balance-list)**_

|Name|Required|Type|
|----|--------|----|
|No parameter required|-|-|

```js
merchant.getBalanceList({
  // no parameter required
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 2. getCoinBalance

_Reference: **[Get coin balance](https://ccpayment.com/api/doc?en#get-coin-balance)**_

|Name|Required|Type|
|----|--------|----|
|`coinId`|Yes|`integer`|

```js
merchant.getCoinBalance({
  body: {
    coinId: 1280
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 3. createInvoice

_Reference: **[Create deposit address for order](https://ccpayment.com/api/doc?en#create-deposit-address-for-order)**_

|Name|Required|Type|
|----|--------|----|
|`coinId`|Yes|`integer`|
|`price`|Yes|`string`|
|`chain`|Yes|`string`|
|`orderId`|Yes|`string`|
|`fiatId`|No|`integer`|
|`expiredAt`|No|`integer`|
|`buyerEmail`|No|`string`|
|`generateCheckoutURL`|No|`boolean`|
|`product`|No|`string`|
|`returnUrl`|No|`string`|

```js
merchant.createInvoice({
  body: {
    coinId: 1280,
    price: "1",
    chain: "POLYGON",
    orderId: "some_order_id_123",
    // fiatId: 123,
    // expiredAt: Math.floor(Date.now() / 1000) + 3600,
    // buyerEmail: "someone@gmail.com",
    // generateCheckoutURL: false,
    // product: "some_product_name",
    // returnUrl: "https://example.com"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 4. getInvoiceDetail

_Reference: **[Get order information](https://ccpayment.com/api/doc?en#get-order-information)**_

|Name|Required|Type|
|----|--------|----|
|`orderId`|Yes|`string`|

```js
merchant.getInvoiceDetail({
  body: {
    orderId: "some_order_id_123"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 5. createPermanentAddress

_Reference: **[Get permanent deposit address](https://ccpayment.com/api/doc?en#get-permanent-deposit-address)**_

|Name|Required|Type|
|----|--------|----|
|`referenceId`|Yes|`string`|

```js
merchant.createPermanentAddress({
  body: {
    referenceId: "some_reference_id",
    chain: "POLYGON"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 6. getDepositRecord

_Reference: **[Get deposit record](https://ccpayment.com/api/doc?en#get-deposit-record)**_

|Name|Required|Type|
|----|--------|----|
|`recordId`|Yes|`string`|

```js
merchant.getDepositRecord({
  body: {
    recordId: "some_record_id_123"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 7. getDepositRecordList

_Reference: **[Get deposit record list](https://ccpayment.com/api/doc?en#get-deposit-record-list)**_

|Name|Required|Type|
|----|--------|----|
|`coinId`|No|`integer`|
|`referenceId`|No|`string`|
|`orderId`|No|`string`|
|`chain`|No|`string`|
|`startAt`|No|`integer`|
|`endAt`|No|`integer`|
|`nextId`|No|`string`|

```js
merchant.getDepositRecordList({
  body: {
    // coinId: 1280,
    // referenceId: "some_reference_id",
    // orderId: "some_order_id_123",
    // chain: "POLYGON",
    // startAt: 1721297348,
    // endAt: 1721300968,
    // nextId: "some_next_id"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 8. externalWithdraw

_Reference: **[Create network withdrawal order](https://ccpayment.com/api/doc?en#create-network-withdrawal-order)**_

|Name|Required|Type|
|----|--------|----|
|`coinId`|Yes|`integer`|
|`chain`|Yes|`string`|
|`address`|Yes|`string`|
|`orderId`|Yes|`string`|
|`amount`|Yes|`string`|
|`memo`|No|`string`|
|`merchantPayNetworkFee`|No|`boolean`|

```js
merchant.externalWithdraw({
  body: {
    coinId: 1280,
    chain: "POLYGON",
    address: "0xSomeWalletAddress",
    orderId: "some_order_id_123",
    amount: "1",
    // memo: "some_address_memo",
    // merchantPayNetworkFee: false
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 9. internalWithdraw

_Reference: **[Withdraw to CWallet Account](https://ccpayment.com/api/doc?en#withdrawal-to-cwallet-account)**_

|Name|Required|Type|
|----|--------|----|
|`coinId`|Yes|`integer`|
|`cwalletUser`|Yes|`string`|
|`amount`|Yes|`string`|
|`orderId`|Yes|`string`|

```js
merchant.internalWithdraw({
  body: {
    coinId: 1280,
    cwalletUser: "9558861",
    amount: "1",
    orderId: "some_order_id_123"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 10. getWithdrawalRecord

_Reference: **[Get withdrawal record](https://ccpayment.com/api/doc?en#get-withdrawal-record)**_

|Name|Required|Type|
|----|--------|----|
|`recordId`|No|`string`|
|`orderId`|No|`string`|

```js
merchant.getWithdrawalRecord({
  body: {
    // recordId: "some_record_id_123",
    // orderId: "some_order_id_123"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 11. getWithdrawalRecordList

_Reference: **[Get withdrawal record list](https://ccpayment.com/api/doc?en#get-withdrawal-record-list)**_

|Name|Required|Type|
|----|--------|----|
|`coinId`|No|`integer`|
|`orderIds`|No|`string[]`|
|`chain`|No|`string`|
|`startAt`|No|`integer`|
|`endAt`|No|`integer`|
|`nextId`|No|`string`|

```js
merchant.getWithdrawalRecordList({
  body: {
    // coinId: 1280,
    // orderIds: ["some_order_id_123", "some_order_id_456"],
    // chain: "POLYGON",
    // startAt: 1721297348,
    // endAt: 1721300968,
    // nextId: "some_next_id"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 12. getSwapQuote

_Reference: **[Get swap quote](https://ccpayment.com/api/doc?en#swap-price)**_

|Name|Required|Type|
|----|--------|----|
|`coinIdIn`|Yes|`integer`|
|`amountIn`|Yes|`string`|
|`coinIdOut`|Yes|`integer`|

```js
merchant.getSwapQuote({
  body: {
    coinIdIn: 1280,
    amountIn: "100",
    coinIdOut: 1329
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 13. createSwapOrder

_Reference: **[Create swap order](https://ccpayment.com/api/doc?en#swap-order-create)**_

|Name|Required|Type|
|----|--------|----|
|`orderId`|Yes|`string`|
|`coinIdIn`|Yes|`integer`|
|`amountIn`|Yes|`string`|
|`coinIdOut`|Yes|`integer`|
|`amountOutMinimum`|No|`string`|

```js
merchant.createSwapOrder({
  body: {
    orderId: "some_order_id_123",
    coinIdIn: 1280,
    amountIn: "100",
    coinIdOut: 1329,
    // amountOutMinimum: ""
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 14. getSwapRecord

_Reference: **[Get swap record](https://ccpayment.com/api/doc?en#swap-record)**_

|Name|Required|Type|
|----|--------|----|
|`recordId`|No|`string`|
|`orderId`|No|`string`|

```js
merchant.getSwapRecord({
  body: {
    // recordId: "some_record_id_123",
    // orderId: "some_order_id_123"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 15. getSwapRecordList

_Reference: **[Get swap record list](https://ccpayment.com/api/doc?en#swap-record-list)**_

|Name|Required|Type|
|----|--------|----|
|`recordIds`|No|`string[]`|
|`orderIds`|No|`string[]`|
|`coinIdIn`|No|`integer`|
|`coinIdOut`|No|`integer`|
|`startAt`|No|`integer`|
|`endAt`|No|`integer`|
|`nextId`|No|`string`|

```js
merchant.getSwapRecordList({
  body: {
    // recordIds: ["some_record_id_123", ["some_record_id_456"],
    // orderIds: ["some_order_id_123", "some_order_id_456"],
    // coinIdIn: 1280,
    // coinIdOut: 1329,
    // startAt: 1721297348,
    // endAt: 1721300968,
    // nextId: "some_next_id"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

### Wallet system API

#### 1. getUserBalanceList

_Reference: **[Get user balance list](https://ccpayment.com/api/doc?en#get-a-list-of-user-assets)**_

|Name|Required|Type|
|----|--------|----|
|`userId`|Yes|`string`|

```js
walletSystem.getUserBalanceList({
  body: {
    userId: "user_id_123"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 2. getUserBalance

_Reference: **[Get coin balance of users](https://ccpayment.com/api/doc?en#acquisition-of-user-token-assets)**_

|Name|Required|Type|
|----|--------|----|
|`userId`|Yes|`string`|
|`coinId`|Yes|`integer`|

```js
walletSystem.getUserBalance({
  body: {
    userId: "user_id_123",
    coinId: 1280
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 3. getUserDepositAddress

_Reference: **[Get user deposit address](https://ccpayment.com/api/doc?en#get-or-create-a-user-address)**_

|Name|Required|Type|
|----|--------|----|
|`userId`|Yes|`string`|
|`chain`|Yes|`string`|

```js
walletSystem.getUserDepositAddress({
  body: {
    userId: "user_id_123",
    chain: "POLYGON"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 4. getUserDepositRecord

_Reference: **[Get user deposit record](https://ccpayment.com/api/doc?en#get-user-recharge-records)**_

|Name|Required|Type|
|----|--------|----|
|`recordId`|Yes|`string`|

```js
walletSystem.getUserDepositRecord({
  body: {
    recordId: "some_record_id_123"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 5. getUserDepositRecordList

_Reference: **[Get user deposit record list](https://ccpayment.com/api/doc?en#get-user-recharge-history)**_

|Name|Required|Type|
|----|--------|----|
|`userId`|Yes|`string`|
|`coinId`|No|`integer`|
|`chain`|No|`string`|
|`startAt`|No|`integer`|
|`endAt`|No|`integer`|
|`nextId`|No|`string`|

```js
walletSystem.getUserDepositRecordList({
  body: {
    userId: "user_id_123",
    // coinId: 1280,
    // chain: "POLYGON",
    // startAt: 1721297348,
    // endAt: 1721300968,
    // nextId: "some_next_id"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 6. externalUserWithdraw

_Reference: **[Withdraw to blockchain address](https://ccpayment.com/api/doc?en#user-withdrawals-to-blockchain)**_ 

|Name|Required|Type|
|----|--------|----|
|`coinId`|Yes|`integer`|
|`userId`|Yes|`string`|
|`chain`|Yes|`string`|
|`address`|Yes|`string`|
|`orderId`|Yes|`string`|
|`amount`|Yes|`string`|
|`memo`|No|`string`|


```js
walletSystem.externalUserWithdraw({
  body: {
    coinId: 1280,
    userId: "user_id_123",
    chain: "POLYGON",
    address: "0xSomeWalletAddress",
    orderId: "some_order_id_123",
    amount: "1",
    // memo: "some_address_memo"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 7. internalUserWithdraw

_Reference: **[Withdraw to CWallet Account](https://ccpayment.com/api/doc?en#user-withdrawals-to-cwallet-account)**_

|Name|Required|Type|
|----|--------|----|
|`coinId`|Yes|`integer`|
|`userId`|Yes|`string`|
|`cwalletUser`|Yes|`string`|
|`amount`|Yes|`string`|
|`orderId`|Yes|`string`|

```js
walletSystem.internalUserWithdraw({
  body: {
    coinId: 1280,
    userId: "user_id_123",
    cwalletUser: "9558861",
    amount: "1",
    orderId: "some_order_id_123"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 8. getUserWithdrawalRecord

_Reference: **[Get user withdrawal record](https://ccpayment.com/api/doc?en#get-user-withdrawal-records)**_

|Name|Required|Type|
|----|--------|----|
|`recordId`|No|`string`|
|`orderId`|No|`string`|

```js
walletSystem.getUserWithdrawalRecord({
  body: {
    // recordId: "some_record_id_123",
    // orderId: "some_order_id_123"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 9. getUserWithdrawalRecordList

_Reference: **[Get user withdrawal record list](https://ccpayment.com/api/doc?en#get-user-withdrawal-history)**_

|Name|Required|Type|
|----|--------|----|
|`userId`|Yes|`string`|
|`coinId`|No|`integer`|
|`toAddress`|No|`string`|
|`chain`|No|`string`|
|`startAt`|No|`integer`|
|`endAt`|No|`integer`|
|`nextId`|No|`string`|

```js
walletSystem.getUserWithdrawalRecordList({
  body: {
    userId: "user_id_123",
    // coinId: 1280,
    // toAddress: "0xSomeWalletAddress",
    // chain: "POLYGON",
    // startAt: 1721297348,
    // endAt: 1721300968,
    // nextId: "some_next_id"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 10. internalUserTransfer

_Reference: **[Create an internal transaction](https://ccpayment.com/api/doc?en#initiate-user-transfers)**_

|Name|Required|Type|
|----|--------|----|
|`fromUserId`|Yes|`string`|
|`toUserId`|Yes|`string`|
|`coinId`|Yes|`integer`|
|`amount`|Yes|`string`|
|`orderId`|Yes|`string`|
|`remark`|No|`string`|

```js
walletSystem.internalUserTransfer({
  body: {
    fromUserId: "user_id_123",
    toUserId: "user_id_456",
    coinId: 1280,
    amount: "1",
    orderId: "some_order_id_123",
    // remark: "some_remark"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 11. getUserTransferRecord

_Reference: **[Get user internal transaction record](https://ccpayment.com/api/doc?en#get-user-transfer-records)**_

|Name|Required|Type|
|----|--------|----|
|`recordId`|No|`string`|
|`orderId`|No|`string`|

```js
walletSystem.getUserTransferRecord({
  body: {
    // recordId: "record_id_123",
    // orderId: "order_id_123"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 12. getUserTransferRecordList

_Reference: **[Get user internal transaction record list](https://ccpayment.com/api/doc?en#get-user-transfer-history)**_

|Name|Required|Type|
|----|--------|----|
|`fromUserId`|Yes|`string`|
|`toUserId`|Yes|`string`|
|`coinId`|No|`integer`|
|`startAt`|No|`integer`|
|`endAt`|No|`integer`|
|`nextId`|No|`string`|

```js
walletSystem.getUserTransferRecordList({
  body: {
    fromUserId: "user_id_123",
    toUserId: "user_id_456",
    // coinId: 1280,
    // startAt: 1721297348,
    // endAt: 1721300968,
    // nextId: "some_next_id"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 13. createUserSwapOrder

_Reference: **[Create user swap order](https://ccpayment.com/api/doc?en#user-swap-order-create)**_

|Name|Required|Type|
|----|--------|----|
|`orderId`|Yes|`string`|
|`userId`|Yes|`string`|
|`coinIdIn`|Yes|`integer`|
|`amountIn`|Yes|`string`|
|`coinIdOut`|Yes|`integer`|
|`extraFeeRate`|No|`string`|
|`amountOutMinimum`|No|`string`|

```js
walletSystem.createUserSwapOrder({
  body: {
    orderId: "some_order_id_123",
    userId: "user_id_123",
    coinIdIn: 1280,
    amountIn: "100",
    coinIdOut: 1329,
    // extraFeeRate: "",
    // amountOutMinimum: ""
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 14. getUserSwapRecord

_Reference: **[Get user swap record](https://ccpayment.com/api/doc?en#user-swap-record)**_

|Name|Required|Type|
|----|--------|----|
|`recordId`|No|`string`|
|`orderId`|No|`string`|

```js
walletSystem.getUserSwapRecord({
  body: {
    // recordId: "some_record_id_123",
    // orderId: "some_order_id_123"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

#### 15. getUserSwapRecordList

_Reference: **[Get user swap record list](https://ccpayment.com/api/doc?en#user-swap-record-list)**_

|Name|Required|Type|
|----|--------|----|
|`recordIds`|No|`string[]`|
|`orderIds`|No|`string[]`|
|`userId`|No|`string`|
|`coinIdIn`|No|`integer`|
|`coinIdOut`|No|`integer`|
|`startAt`|No|`integer`|
|`endAt`|No|`integer`|
|`nextId`|No|`string`|

```js
walletSystem.getUserSwapRecordList({
  body: {
    // recordIds: ["some_record_id_123", ["some_record_id_456"],
    // orderIds: ["some_order_id_123", "some_order_id_456"],
    // userId: "some_user_id_123",
    // coinIdIn: 1280,
    // coinIdOut: 1329,
    // startAt: 1721297348,
    // endAt: 1721300968,
    // nextId: "some_next_id"
  },
  onSuccess: "some_on_success_cmd"
});
```
[Back](#documentation--flow)

## Contact me
You can contact me at [@mslylia](https://t.me/mslylia) on Telegram for any related questions.
