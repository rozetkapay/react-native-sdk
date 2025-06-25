import type { PaymentResult } from "./PaymentResult";
import { convertToTokenizedCard } from "../../tokenization/TokenizationResultConverter";

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
                externalId: result.externalId,
                paymentId: result.paymentId,
            };
        case 'Complete':
            return {
                type: 'Complete',
                externalId: result.externalId,
                paymentId: result.paymentId,
                tokenizedCard: result.tokenizedCard ? convertToTokenizedCard(result.tokenizedCard) : undefined,
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