import type { PaymentResult } from "./PaymentResult";

/**
 * Converts the native result to a PaymentResult object.
 * @param result - The result from the native module.
 * @returns A PaymentResult object.
 */
export function convertToPaymentResult(result: any): PaymentResult {
    switch (result.type) {
        case 'Pending':
            return {
                type: 'Pending',
                orderId: result.orderId,
                paymentId: result.paymentId,
            };
        case 'Complete':
            return {
                type: 'Complete',
                orderId: result.orderId,
                paymentId: result.paymentId,
            };
        case 'Failed':
            return {
                type: 'Failed',
                paymentId: result.paymentId,
                message: result.message,
                error: result.error,
            };
        case 'Cancelled':
            return {
                type: 'Cancelled',
            };
        default:
            throw new Error('Unknown result type from native module');
    }
}