import type { defaultCardPaymentFieldsParameters } from "../CardPaymentFieldsParameters";
import type { ApplePayConfig } from "./ApplePayConfig";
import type { GooglePayConfig } from "./GooglePayConfig";

export type PaymentTypeConfiguration = PaymentTypeConfiguration.RegularPayment | PaymentTypeConfiguration.SingleTokenPayment;

export namespace PaymentTypeConfiguration {
    export interface Base {
        type: 'RegularPayment' | 'SingleTokenPayment';
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
}