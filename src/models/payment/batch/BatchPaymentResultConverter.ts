import type { BatchPaymentResult, BatchOrderPaymentResult } from "./BatchPaymentResult";
import { convertToTokenizedCard } from "../../tokenization/TokenizationResultConverter";

/**
 * Converts the native result to a BatchPaymentResult object.
 * @param result - The result from the native module.
 * @returns A BatchPaymentResult object.
 */
export function convertToBatchPaymentResult(result: any): BatchPaymentResult {
    switch (result.type) {
        case 'Pending':
            return {
                type: 'Pending',
                externalId: result.externalId,
                ordersPayments: result.ordersPayments.map(convertToBatchOrderPaymentResult),
            };
        case 'Complete':
            return {
                type: 'Complete',
                externalId: result.externalId,
                ordersPayments: result.ordersPayments.map(convertToBatchOrderPaymentResult),
                tokenizedCard: result.tokenizedCard ? convertToTokenizedCard(result.tokenizedCard) : undefined,
            };
        case 'Failed':
            return {
                type: 'Failed',
                ordersPayments: result.ordersPayments?.map(convertToBatchOrderPaymentResult),
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

export function convertToBatchOrderPaymentResult(result: any): BatchOrderPaymentResult {
    return {
        externalId: result.externalId,
        operationId: result.operationId,
    };
}