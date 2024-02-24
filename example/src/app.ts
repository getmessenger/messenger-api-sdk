// How to use
import Typicode from "messenger-api-sdk";

const client = new Typicode(
  "pk_live_UbQjMyQBV3f8uiWdwNpgQXIP0oa9EEGsskzNAGdH",
  "sk_live_V5uV9kaNLlMH4O4hKSOwTMkDo7tHAcfBynZ8TgtF",
  "production"
);

async function performLogin() {
  try {
    const response = await client.login();
    const accessToken = client.getAccessToken();
    console.log("New login is successful with response:", response);
    console.log("Access Token:", accessToken);
  } catch (error) {
    console.error(
      "Login failed with error:",
      error?.response?.data?.message || error.message
    );
    throw error;
  }
}

async function performApiRequests() {
  try {
    const checkWalletBalance = await client.makeApiRequest({
      method: "get",
      url: `/wallets`,
    });
    console.log("checkWalletBalance Request Successful:", checkWalletBalance);

    const getAllTransactions = await client.makeApiRequest({
      method: "get",
      url: `/wallets/${6127}/transactions`,
    });
    console.log("getAllTransactions Request Successful:", getAllTransactions);

    const getAllOrders = await client.makeApiRequest({
      method: "get",
      url: `/orders`,
    });
    console.log("getAllOrders Request Successful:", getAllOrders);
  } catch (error) {
    console.error(
      "Wallet API Request failed with error:",
      error?.response?.data?.message || error.message
    );
  }
}

(async () => {
  await performLogin();

  await performApiRequests();
})();
