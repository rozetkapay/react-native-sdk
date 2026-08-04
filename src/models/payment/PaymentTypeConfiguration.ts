import type { defaultCardPaymentFieldsParameters } from "../CardPaymentFieldsParameters";
import type { ApplePayConfig } from "./ApplePayConfig";
import type { GooglePayConfig } from "./GooglePayConfig";

export type PaymentTypeConfiguration = PaymentTypeConfiguration.RegularPayment | PaymentTypeConfiguration.SingleTokenPayment | PaymentTypeConfiguration.GooglePayPayment;

export namespace PaymentTypeConfiguration {
    export interface Base {
        type: 'RegularPayment' | 'SingleTokenPayment' | 'GooglePayPayment';
    }

    export interface RegularPayment extends Base {
        type: 'RegularPayment';
        cardFieldsParameters: typeof defaultCardPaymentFieldsParameters;
        allowTokenization: boolean;
        googlePayConfig?: GooglePayConfig;
        applePayConfig?: ApplePayConfig;
    }

    export interface SingleTokenPayment extends Base {
        type: 'SingleTokenPayment';
        token: string;
    }

    /**
     * Launches the payment flow directly into Google Pay, skipping the card-form /
     * payment-method-selection UI. Intended to be used together with a Google Pay button
     * rendered by the host app, gated on {@link isGooglePayAvailable}.
     */
    export interface GooglePayPayment extends Base {
        type: 'GooglePayPayment';
        googlePayConfig: GooglePayConfig;
    }

    export function regularPayment(
        cardFieldsParameters: typeof defaultCardPaymentFieldsParameters,
        allowTokenization: boolean,
        googlePayConfig?: GooglePayConfig,
        applePayConfig?: ApplePayConfig
    ): RegularPayment {
        return {
            type: 'RegularPayment',
            cardFieldsParameters,
            allowTokenization,
            googlePayConfig,
            applePayConfig
        };
    }

    export function singleTokenPayment(token: string): SingleTokenPayment {
        return {
            type: 'SingleTokenPayment',
            token
        };
    }

    export function googlePayPayment(googlePayConfig: GooglePayConfig): GooglePayPayment {
        return {
            type: 'GooglePayPayment',
            googlePayConfig
        };
    }
}