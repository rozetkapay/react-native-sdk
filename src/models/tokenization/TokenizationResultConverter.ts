import type { TokenizationResult } from "./TokenizationResult";
import type { TokenizedCard } from "./TokenizedCard";

/**
 * Converts the native result to a TokenizationResult object.
 * @param result - The result from the native module.
 * @returns A TokenizationResult object.
 */
export function convertToTokenizationResult(result: any): TokenizationResult {
    switch (result.type) {
        case 'Complete':
            return {
                type: 'Complete',
                tokenizedCard: convertToTokenizedCard(result.tokenizedCard),
            };
        case 'Failed':
            return {
                type: 'Failed',
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

export function convertToTokenizedCard(result: any): TokenizedCard {
    return {
        token: result.token,
        name: result.name,
        cardInfo: result.cardInfo
            ? {
                maskedNumber: result.cardInfo.maskedNumber,
                expiresAt: result.cardInfo.expiresAt,
                paymentSystem: result.cardInfo.paymentSystem,
                bank: result.cardInfo.bank,
                isoA3Code: result.cardInfo.isoA3Code,
                cardType: result.cardInfo.cardType,
            }
            : undefined,
    };
}