import type { TokenizedCard } from "../../tokenization/TokenizedCard";

export type PaymentResult =
    | PendingPaymentResult
    | CompletePaymentResult
    | FailedPaymentResult
    | CancelledPaymentResult;

export interface PendingPaymentResult {
    type: 'Pending';
    externalId: string;
    paymentId: string;
}

export interface CompletePaymentResult {
    type: 'Complete';
    externalId: string;
    paymentId: string;
    tokenizedCard?: TokenizedCard;
}

export interface FailedPaymentResult {
    type: 'Failed';
    paymentId?: string;
    message?: string;
    error?: string; 
}

export interface CancelledPaymentResult {
    type: 'Cancelled';
}