export type PaymentResult =
    | PendingPaymentResult
    | CompletePaymentResult
    | FailedPaymentResult
    | CancelledPaymentResult;

export interface PendingPaymentResult {
    type: 'Pending';
    orderId: string;
    paymentId: string;
}

export interface CompletePaymentResult {
    type: 'Complete';
    orderId: string;
    paymentId: string;
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