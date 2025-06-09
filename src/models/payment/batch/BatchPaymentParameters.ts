import type { defaultThemeConfigurator } from "../../theme/ThemeConfigurator";
import type { ClientAuthParameters } from "../ClientAuthParameters";
import type { PaymentTypeConfiguration } from "../PaymentTypeConfiguration";

export type MakeBatchPaymentParams = {
    clientAuthParameters: ClientAuthParameters,
    paymentParameters: BatchPaymentParameters;
    themeConfigurator?: typeof defaultThemeConfigurator;
}

export interface BatchPaymentParameters {
    currencyCode: string; // ISO-4217
    externalId: string;
    callbackUrl?: string;
    paymentType: PaymentTypeConfiguration;
    orders: BatchOrder[];
}

export interface BatchOrder {
    apiKey: string; 
    amount: number; // amount in coins
    externalId: string;
    description: string; // can't be null or empty
}