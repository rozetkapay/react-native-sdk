import type { defaultThemeConfigurator } from "../theme/ThemeConfigurator";
import type { GooglePayConfig } from "./GooglePayConfig";

export type MakePaymentParams = {
    token: string;
    paymentParameters: PaymentParameters;
    themeConfigurator?: typeof defaultThemeConfigurator;
}

export interface AmountParameters {
    amount: number; // amount in coins
    currencyCode: string; // ISO-4217
}

export interface PaymentParameters {
    amountParameters: AmountParameters;
    orderId: string;      
    callbackUrl?: string;
    allowTokenization: boolean;
    googlePayConfig?: GooglePayConfig;
}