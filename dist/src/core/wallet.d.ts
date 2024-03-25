import { MessengerSDKBase } from "./base";
import { TransactionsResponse, WalletBalanceResponse, WalletTransactionByReferenceResponse } from "./interfaces/wallet.interface";
export declare abstract class MessengerWallet extends MessengerSDKBase {
    private baseWalletUrl;
    constructor(publicKey: string, privateKey: string);
    checkWalletBalance(): Promise<WalletBalanceResponse>;
    getAllTransactions(walletId: number): Promise<TransactionsResponse>;
    getTransactionByReference(reference: string): Promise<WalletTransactionByReferenceResponse>;
}
