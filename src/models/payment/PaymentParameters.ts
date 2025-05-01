import type { defaultCardPaymentFieldsParameters } from "../CardPaymentFieldsParameters";
import type { defaultThemeConfigurator } from "../theme/ThemeConfigurator";
import type { ApplePayConfig } from "./ApplePayConfig";
import type { GooglePayConfig } from "./GooglePayConfig";

export type MakePaymentParams = {
    token: string;
    widgetKey: string;
    fieldsParameters?: typeof defaultCardPaymentFieldsParameters;
    paymentParameters: PaymentParameters;
    themeConfigurator?: typeof defaultThemeConfigurator;
}

export interface PaymentParameters {
    amountParameters: AmountParameters;
    orderId: string;      
    callbackUrl?: string;
    allowTokenization: boolean; 
    googlePayConfig?: GooglePayConfig; // Android-specific
    applePayConfig?: ApplePayConfig;  // iOS-specific

}

export interface AmountParameters {
    amount: number; // amount in coins
    currencyCode: string; // ISO-4217
}