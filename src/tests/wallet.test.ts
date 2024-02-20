import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import MessengerWallet from "../core/wallet";
import { MessengerSDKBase } from "../core/base";
import { expect, describe, afterEach, it, beforeEach } from "@jest/globals";

const mockAuthInstance = new MessengerSDKBase(
  "publicKey",
  "privateKey",
  "development"
);
const mockAxios = new MockAdapter(axios as any);

describe("MessengerWallet", () => {
  let messengerWallet: MessengerWallet;

  beforeEach(() => {
    messengerWallet = new MessengerWallet(
      "publicKey",
      "privateKey",
      "development"
    );
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it("should successfully check wallet balance", async () => {
    const mockBalanceResponse = { balance: 1000 };
    mockAxios.onGet("/wallets").reply(200, mockBalanceResponse);

    const result = await messengerWallet.checkWalletBalance();

    expect(result).toEqual(mockBalanceResponse);
  });

  it("should successfully get all transactions", async () => {
    const walletId = "wallet123";
    const mockTransactionsResponse = {
      transactions: [{ id: "123", amount: 50 }],
    };
    mockAxios
      .onGet(`/wallets/${walletId}/transactions`)
      .reply(200, mockTransactionsResponse);

    const result = await messengerWallet.getAllTransactions(walletId);

    expect(result).toEqual(mockTransactionsResponse);
  });

  it("should successfully get a transaction by reference", async () => {
    const reference = "ref123";
    const mockTransactionResponse = { id: "123", amount: 50 };
    mockAxios
      .onGet(`/wallets/transactions/${reference}`)
      .reply(200, mockTransactionResponse);

    const result = await messengerWallet.getTransactionByReference(reference);

    expect(result).toEqual(mockTransactionResponse);
  });

  it("should handle errors in checkWalletBalance", async () => {
    mockAxios
      .onGet("/wallets")
      .reply(500, { message: "Internal Server Error" });

    await expect(messengerWallet.checkWalletBalance()).resolves.toEqual({
      message: "Internal Server Error",
    });
  });

  it("should handle errors in getAllTransactions", async () => {
    const walletId = "wallet123";
    mockAxios
      .onGet(`/wallets/${walletId}/transactions`)
      .reply(404, { message: "Not Found" });

    await expect(messengerWallet.getAllTransactions(walletId)).rejects.toEqual({
      message: "Not Found",
    });
  });

  it("should handle errors in getTransactionByReference", async () => {
    const reference = "ref123";
    mockAxios
      .onGet(`/wallets/transactions/${reference}`)
      .reply(401, { message: "Unauthorized" });

    await expect(
      messengerWallet.getTransactionByReference(reference)
    ).rejects.toEqual({ message: "Unauthorized" });
  });
});
