import type { BaseResponse } from "./base-response";

export interface WalletBalanceResponse {
  data: {
    id: number;
    ledger_balance: number;
    hold_balance: number;
    available_balance: number;
    currency: string;
  };
}

export interface WalletBalanceResponseProps extends BaseResponse {
  data: WalletBalanceResponse[];
}

export interface WalletTransactions {
  amount: number;
  ledger_balance: number;
  available_balance: number;
  reference: string;
  status: string;
  entry_type: string;
  transaction_type: string;
  narration: string;
  transaction_date: string;
  created_on: string;
}

export interface TransactionsResponse extends BaseResponse {
  data: WalletTransactions[];
}

export interface WalletTransactionByReference {
  amount: number;
  ledger_balance: number;
  available_balance: number;
  reference: string;
  status: string;
  entry_type: string;
  transaction_type: string;
  narration: string;
  transaction_date: string;
  created_on: string;
}

export interface WalletTransactionByReferenceResponse {
  message: string;
  data: WalletTransactionByReference;
}
