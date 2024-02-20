import { MessengerSDKBase } from "./base";
import { TransactionsResponse, WalletBalanceResponse, WalletTransactionByReferenceResponse } from "./interfaces/wallet.interface";
export default class MessengerWallet extends MessengerSDKBase {
    private baseWalletUrl;
    constructor(publicKey: string, privateKey: string, environment: "production" | "development");
    checkWalletBalance(): Promise<WalletBalanceResponse>;
    getAllTransactions(walletId: string): Promise<TransactionsResponse>;
    getTransactionByReference(reference: string): Promise<WalletTransactionByReferenceResponse>;
}
