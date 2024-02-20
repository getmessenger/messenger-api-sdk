import { MessengerSDKBase } from "./base";
import {
  TransactionsResponse,
  WalletBalanceResponse,
  WalletTransactionByReferenceResponse,
} from "./interfaces/wallet.interface";

export default class MessengerWallet extends MessengerSDKBase {
  private baseWalletUrl: string;
  constructor(
    publicKey: string,
    privateKey: string,
    environment: "production" | "development"
  ) {
    super(publicKey, privateKey, environment);
    this.baseWalletUrl = "/wallets";
  }

  public async checkWalletBalance(): Promise<WalletBalanceResponse> {
    return this.makeApiRequest<WalletBalanceResponse>({
      method: "get",
      url: this.baseWalletUrl,
    });
  }

  public async getAllTransactions(
    walletId: string
  ): Promise<TransactionsResponse> {
    return this.makeApiRequest<TransactionsResponse>({
      method: "get",
      url: `${this.baseWalletUrl}/${walletId}/transactions`,
    });
  }

  public async getTransactionByReference(
    reference: string
  ): Promise<WalletTransactionByReferenceResponse> {
    return this.makeApiRequest<WalletTransactionByReferenceResponse>({
      method: "get",
      url: `${this.baseWalletUrl}/transactions/${reference}`,
    });
  }
}
