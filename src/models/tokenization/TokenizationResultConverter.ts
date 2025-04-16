import type { TokenizationResult } from "./TokenizationResult";

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
                tokenizedCard: {
                    token: result.tokenizedCard.token,
                    name: result.tokenizedCard.name,
                    cardInfo: result.tokenizedCard.cardInfo
                        ? {
                            maskedNumber: result.tokenizedCard.cardInfo.maskedNumber,
                            paymentSystem: result.tokenizedCard.cardInfo.paymentSystem,
                            bank: result.tokenizedCard.cardInfo.bank,
                            isoA3Code: result.tokenizedCard.cardInfo.isoA3Code,
                            cardType: result.tokenizedCard.cardInfo.cardType,
                        }
                        : undefined,
                },
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