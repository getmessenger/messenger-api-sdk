import { MessengerSDKBase } from "./base";
import {
  TransactionsResponse,
  WalletBalanceResponse,
  WalletTransactionByReferenceResponse,
} from "./interfaces/wallet.interface";

export abstract class MessengerWallet extends MessengerSDKBase {
  private baseWalletUrl: string;
  constructor(publicKey: string, privateKey: string) {
    super(publicKey, privateKey);
    this.baseWalletUrl = "/wallets";
  }

  public async checkWalletBalance(): Promise<WalletBalanceResponse> {
    return this.makeApiRequest({
      method: "get",
      url: this.baseWalletUrl,
    });
  }

  public async getAllTransactions(
    walletId: number
  ): Promise<TransactionsResponse> {
    return this.makeApiRequest({
      method: "get",
      url: `${this.baseWalletUrl}/${walletId}/transactions`,
    });
  }

  public async getTransactionByReference(
    reference: string
  ): Promise<WalletTransactionByReferenceResponse> {
    return this.makeApiRequest({
      method: "get",
      url: `${this.baseWalletUrl}/transactions/${reference}`,
    });
  }
}
