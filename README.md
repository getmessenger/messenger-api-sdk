<!-- Get messenger logo -->

**Get Messenger SDK**

# Table Of Content

- [Table Of Content](#table-of-content)
  - [Introduction 🚀](#introduction-)
    - [Get Messenger SDK Features 🚀](#get-messenger-sdk-features-)
  - [Installation 💽](#installation-)
  - [Usage](#usage)
    - [SDK Typed Response](#sdk-typed-response)
    - [Wallets](#wallets)
    - [Live Environment](#live-environment)
    - [Staging Environment (Sandbox)](#staging-environment-sandbox)
    - [Get Wallet Balance](#get-wallet-balance)
      - [Parameters](#parameters)
      - [Returns](#returns)
      - [Example](#example)
    - [Get All Transactions](#get-all-transactions)
      - [Parameters](#parameters-1)
      - [Returns](#returns-1)
      - [Example](#example-1)
    - [Get Transaction By Reference](#get-transaction-by-reference)
      - [Parameters](#parameters-2)
      - [Returns](#returns-2)
      - [Example](#example-2)
    - [Orders](#orders)
    - [Estimate Order](#estimate-order)
      - [Parameters](#parameters-3)
      - [Returns](#returns-3)
      - [Example](#example-3)
    - [Get Address Coordinates](#get-address-coordinates)
      - [Parameters](#parameters-4)
      - [Returns](#returns-4)
      - [Example](#example-4)
    - [Confirm Order](#confirm-order)
      - [Parameters](#parameters-5)
      - [Returns](#returns-5)
      - [Example](#example-5)
    - [Cancel Order](#cancel-order)
      - [Parameters](#parameters-6)
      - [Returns](#returns-6)
      - [Example](#example-6)
    - [Dispute Order](#dispute-order)
      - [Parameters](#parameters-7)
      - [Returns](#returns-7)
      - [Example](#example-7)
    - [Fetch Orders](#fetch-orders)
      - [Parameters](#parameters-8)
      - [Returns](#returns-8)
      - [Example](#example-8)
    - [Fetch Order by ID](#fetch-order-by-id)
      - [Parameters](#parameters-9)
      - [Returns](#returns-9)
      - [Example](#example-9)
    - [Fetch Orders Analytics](#fetch-orders-analytics)
      - [Parameters](#parameters-10)
      - [Returns](#returns-10)
      - [Example](#example-10)

## Introduction 🚀

Welcome to the Messenger SDK Integration Guide! Messenger offers an all-encompassing logistics platform designed to streamline and finance end-to-end supply chain operations, aiding businesses and logistics asset owners in achieving an efficient supply chain framework.

Our Order APIs empower businesses in need of dispatch services by connecting them with a vast network of Messenger Riders to facilitate their deliveries seamlessly. This document serves as a comprehensive guide and detailed specification for integrating the Messenger APIs into your application, ensuring a smooth and effective implementation. Explore the detailed information provided here to seamlessly integrate our SDK into your respective application and optimize your logistics and supply chain operations.

### Get Messenger SDK Features 🚀

- **Seamless Integration Experience:** The Messenger SDK streamlines the integration process, allowing users to interact with Messenger APIs effortlessly, facilitating a smooth and efficient integration into your application.

- **Rapid Development:** Experience accelerated development with simplified methods and enhanced autocompletion, enabling developers to expedite product releases and reduce time-to-market for your logistics and supply chain solutions.

- **Simplified API Interaction:** Users can harness robust logistics functionalities without the need for direct interaction with the Messenger APIs, simplifying the development process and making it more accessible for your team.

- **Typed Responses for Precision:** The Messenger SDK automatically generates type definitions for API responses, ensuring the development of robust and error-free code. Enjoy a more structured development experience with effortlessly typed responses.

- **Enhanced Code Documentation:** Benefit from comprehensive JSDoc support that enriches code documentation. Developers can access descriptive and detailed information, making it easier to comprehend and leverage the full capabilities of the Messenger SDK.

- **Effective Error Handling:** The SDK facilitates efficient error handling, offering detailed information for seamless debugging. Developers can quickly identify and resolve issues, ensuring a reliable integration and enhancing the overall stability of your logistics application.

## Installation 💽

To install the **SDK** in your application, you can install using `npm, yarn, pnpm or bun`

**Npm**

```bash
npm install messenger-merchant
```

**Yarn**

```bash
yarn add messenger-merchant
```

**Bun**

```bash
bun add messenger-merchant
```

## Usage

While the Messenger SDK prioritizes simplicity for developers, I'll provide a brief overview of each method to enhance understanding. To begin using the Messenger SDK, import the **CreateMessengerClient** from the **{{package name}}** package. That class provides the interface to work with the **SDK**.

```typescript
import MessengerClient from messenger-merchant;
```

Next, instantiate a new instance of the **CreateMessengerClient** class, enabling interaction with its methods. This class requires 3 arguments:

1. Messenger Public Key
2. Messenger Private Key
3. Environment

You can obtain the Public and Private Keys from creating an account with messenger. To do this, go to

```typescript
const messengerClient = new MessengerClient(
  process.env.MESSENGER_PUBLIC_KEY as string,
  process.env.MESSENGER_PRIVATE_KEY as string,
  process.env.NODE_ENV as string
);
```

### SDK Typed Response

The Messenger SDK ensures a structured approach to response handling by providing typed responses for every method call. Each method call yields a base response object, offering valuable insights into the status, success or failure of the call, along with a descriptive message. This approach mimics traditional API calls, enabling developers to easily catch errors and tailor their applications based on the method's status.

In TypeScript, the base response object is defined as follows:

```typescript
export interface BaseResponse {
  message: string;
  data?: {};
}
```

This response object allows you to extract crucial information from each method call, including the accompanying message, and any data returned by the method. Leveraging this structured response format enhances error handling and empowers developers to build robust applications with confidence.

### Wallets

To make use of the Messenger Order API, you first need to fund your wallet. Follow the steps below to initiate the wallet funding process using the Messenger SDK.

### Live Environment

When you are ready to go live, fund your wallet by making a transfer to the account details provided to you when your account was first created. Follow these steps:

1. Retrieve the account details sent to you during the account creation process.

2. Use the Messenger SDK to initiate a transfer to the provided account details.

3. Upon successful transfer, your wallet will be funded and ready for live order processing.

### Staging Environment (Sandbox)

In the test environment, we utilize a transfer simulator to fund the wallet. Follow these steps to fund your wallet in the sandbox environment:

1. Access Monipoint, our virtual account handler, using the following link: [Monipoint](https://monipoint.example.com).

2. Use the account number provided in your welcome email to log in.

3. Navigate to the funding section within Monipoint to simulate a transfer to your wallet.

4. Confirm the simulated transfer, and your wallet in the sandbox environment will be successfully funded.

By following these steps, you can ensure that your wallet is adequately funded for testing purposes in the sandbox environment or for live order processing in the production environment.

Feel free to integrate this content into your SDK documentation. If you have any specific modifications or additional details, please let me know!

### Get Wallet Balance

The **Get Wallet Balance** method allows you to check the balance of a specific wallet associated with the Messenger API. This is useful for retrieving real-time information about the available funds in a particular wallet.

#### Parameters

- None

#### Returns

- An object containing the wallet balance response, including details such as the available balance, currency, and other relevant information.

#### Example

```javascript
const getWalletBalance = async (req, res) => {
  const checkWallet = await messengerClient.checkWalletBalance();

  return checkWallet;
};
```

### Get All Transactions

The **Get All Transactions** method enables you to retrieve all transactions associated with a specific wallet on the Messenger API. This allows you to access a comprehensive list of transactions for further analysis and reporting.

#### Parameters

- `walletId` (Number): The identifier of the wallet for which transactions are to be retrieved.

#### Returns

An object containing the transactions response, providing details about all transactions associated with the specified wallet.

#### Example

```javascript
const getAllTransactions = async (req, res) => {
  const walletId = 0000;
  const allTransactions = await messengerClient.getAllTransactions(walletId);

  return allTransactions;
};
```

### Get Transaction By Reference

The **Get Transaction By Reference** method allows you to retrieve a specific transaction from the Messenger API by providing its unique reference. This is useful for obtaining detailed information about a particular transaction.

#### Parameters

- `reference` (String): The unique reference identifier of the transaction.

#### Returns

- An object containing the transaction details response, providing information about the specific transaction identified by the reference.

#### Example

```javascript
const getTransactionByRef = async (req, res) => {
  const reference = "xxxx";
  const transactionsByRef = await messengerClient.getTransactionByReference(
    reference
  );

  return transactionsByRef;
};
```

### Orders

### Estimate Order

The **Estimate Order** method allows you to obtain a cost estimate for a proposed order. Use this method to calculate the estimated cost before confirming the order.

#### Parameters

- `orderData` (Object): Data for the order, including details such as items, quantities, and delivery information.
- `locations` (Array of Objects): An array specifying the locations for the order, including details such as type, latitude, and longitude.

  - Each location object should have the following properties:
    - `type` (String): The type of location, which can be "pickup" or "delivery".
    - `latitude` (Number): The latitude coordinate of the location.
    - `longitude` (Number): The longitude coordinate of the location.

#### Returns

- An object containing the order estimate response, providing information on the estimated cost and other relevant details.

#### Example

```javascript
const orderEstimate = async (req, res) => {
  const orderData = [
    {
      type: "pickup",
      latitude: 6.457,
      longitude: 3.158,
    },
    {
      type: "delivery",
      latitude: 7.4351,
      longitude: 3.9143,
    },
    {
      type: "delivery",
      latitude: 6.4555201,
      longitude: 3.3810686,
    },
  ];

  const orderEstimate = await messengerClient.estimateOrder(orderData);

  return orderEstimate;
};
```

### Get Address Coordinates

The **Get Address Coordinates** method allows you to obtain the coordinates (latitude and longitude) of a given address. This is useful for accurate location-based services.

#### Parameters

- `addressData` (Object): Data containing the address for which coordinates are to be retrieved.
- `address` (String): The address for which you want to obtain coordinates.

#### Returns

- An object containing the address coordinate response, providing the latitude and longitude of the specified address.

#### Example

```javascript
const addressCoordinate = async (req, res) => {
  const addressData = {
    address: "456 Park Avenue",
  };
  const addressCoordinate = await messengerClient.getAddressCoordinates(
    addressData
  );

  return addressCoordinate;
};
```

### Confirm Order

The **Confirm Order** method allows you to confirm and place an order based on the provided order data.

#### Parameters

- `orderData` (Object): Data for the order, including items, quantities, and delivery details.
- `estimate_token` (String): The token obtained from the estimate call, used to confirm the specific order estimate.
- `scheduled_for` (String, optional): The scheduled time for the order, if applicable.
- `locations` (Array of Objects): An array specifying the locations for the order, including details such as type, label, address, latitude, longitude, notes, and contact details.

  - Each location object should have the following properties:

    - `label` (String): A label for the location.
    - `type` (String): The type of location, which can be "pickup" or "delivery".
    - `address` (String): The address of the location.
    - `latitude` (Number): The latitude coordinate of the location.
    - `longitude` (Number): The longitude coordinate of the location.
    - `note` (String, optional): Additional notes related to the location.
    - `contact_name` (String): The name of the contact person for the location.
    - `contact_phone` (String): The primary contact phone number.
    - `contact_alternate_phone` (String, optional): An alternate contact phone number.

- `payment_method` (String): The payment method for the order, such as "wallet".

#### Returns

- An object containing the confirmation response, indicating the success or failure of the order confirmation.

#### Example

```javascript
const confirmOrder = async (req, res) => {
  const orderData = {
    estimate_token: "xxxxx", // this is the token from estimate call
    // "scheduled_for": "2023-06-09 13:00",
    locations: [
      {
        label: "home",
        address: "Ojo",
        type: "pickup",
        latitude: 6.457,
        longitude: 3.158,
        note: "Pick from the gate",
        contact_name: "Wunmi",
        contact_phone: "xxxxxxxxxxx",
        contact_alternate_phone: null,
      },
      {
        label: "home",
        address: "bodija",
        type: "delivery",
        latitude: 7.4351,
        longitude: 3.9143,
        note: "Pick from the gate",
        contact_name: "Wunmi",
        contact_phone: "xxxxxxxxxxx",
        contact_alternate_phone: null,
      },
      {
        type: "delivery",
        label: "Office",
        address: "Ikate",
        latitude: 6.4555201,
        longitude: 3.3810686,
        note: "Give to Charity",
        contact_name: "Wunmi",
        contact_phone: "xxxxxxxxxxx",
        contact_alternate_phone: null,
      },
    ],
    payment_method: "wallet",
  };
  const confirmOrderResponse = await messengerClient.confirmOrder(orderData);

  return confirmOrderResponse;
};
```

### Cancel Order

The **Cancel Order** method allows you to cancel a specific order by providing the necessary cancellation data and the order ID.

#### Parameters

- `cancelOrderData` (Object): Data for the order cancellation, including reasons and additional information.

  - `reason` (String): The reason for canceling the order.

- `orderId` (Number): The identifier of the order to be canceled.

#### Returns

- An object containing the cancellation response, indicating the success or failure of the order cancellation.

#### Example

```javascript
const cancelAOrder = async (req, res) => {
  const cancelOrderData = {
    reason: "Item out of stock",
  };
  const orderId = 1234;
  const cancelOrderResponse = await messengerClient.cancelOrder(
    cancelOrderData,
    orderId
  );

  return cancelOrderResponse;
};
```

### Dispute Order

The **Dispute Order** method allows you to dispute a specific order by providing the necessary dispute data and the order ID.

#### Parameters

- `disputeOrderData` (Object): Data for the order dispute, including reasons and additional information.

  - `comment` (String): Additional comments or reasons for disputing the order.

- `orderId` (Number): The identifier of the order to be disputed.

#### Returns

- An object containing the dispute response, indicating the success or failure of the order dispute.

#### Example

```javascript
const disputeAOrder = async (req, res) => {
  const disputeOrderData: DisputeOrderData = {
    comment: "Incorrect item received",
  };
  const orderId = 5678;

  const disputeOrderResponse = await messengerClient.disputeOrder(
    disputeOrderData,
    orderId
  );

  return disputeOrderResponse;
};
```

### Fetch Orders

The **Fetch Orders** method allows you to retrieve a list of all orders associated with the Messenger API.

#### Parameters

- None

#### Returns

- An object containing the list of orders response, providing details about all orders.

#### Example

```javascript
const getAllOrder = async (req, res) => {
  const orderListResponse = await messengerClient.fetchOrders();

  return orderListResponse;
};
```

### Fetch Order by ID

The **Fetch Order By Id** method allows you to retrieve details about a specific order by providing its unique identifier.

#### Parameters

- `orderId` (Number): The identifier of the order to be retrieved.

#### Returns

- An object containing the single order response, providing details about the specified order.

#### Example

```javascript
const getAOrder = async (req, res) => {
  const orderId = 9876;

  const singleOrderResponse = await messengerClient.fetchOrderById(orderId);

  return singleOrderResponse;
};
```

### Fetch Orders Analytics

The **Fetch Orders Analytics** method allows you to retrieve analytics and insights about the orders processed by the Messenger API.

#### Parameters

- None

#### Returns

- An object containing the orders analytics response, providing insights and statistics related to order processing.

#### Example

```javascript
const getOrderAnalytics = async (req, res) => {
  const orderAnalyticsResponse = await messengerClient.fetchOrdersAnalytics();
  return orderAnalyticsResponse;
};
```
