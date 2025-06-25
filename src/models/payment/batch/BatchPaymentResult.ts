import type { TokenizedCard } from "../../tokenization/TokenizedCard";

export type BatchPaymentResult =
    | BatchPendingPaymentResult
    | BatchCompletePaymentResult
    | BatchFailedPaymentResult
    | BatchCancelledPaymentResult;

export interface BatchPendingPaymentResult {
    type: 'Pending';
    externalId: string;
    ordersPayments: BatchOrderPaymentResult[];
}

export interface BatchCompletePaymentResult {
    type: 'Complete';
    externalId: string;
    ordersPayments: BatchOrderPaymentResult[];
    tokenizedCard?: TokenizedCard;
}

export interface BatchFailedPaymentResult {
    type: 'Failed';
    ordersPayments?: BatchOrderPaymentResult[];
    message?: string;
    error?: string; 
}

export interface BatchCancelledPaymentResult {
    type: 'Cancelled';
}

export interface BatchOrderPaymentResult{
    externalId: string;
    operationId: string;
}