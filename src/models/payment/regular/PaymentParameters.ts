import type { defaultThemeConfigurator } from "../../theme/ThemeConfigurator";
import type { ClientAuthParameters } from "../ClientAuthParameters";
import type { PaymentTypeConfiguration } from "../PaymentTypeConfiguration";

export type MakePaymentParams = {
    clientAuthParameters: ClientAuthParameters,
    paymentParameters: PaymentParameters;
    themeConfigurator?: typeof defaultThemeConfigurator;
}

export interface PaymentParameters {
    amountParameters: AmountParameters;
    externalId: string;
    callbackUrl?: string;
    paymentType: PaymentTypeConfiguration;
}

export interface AmountParameters {
    amount: number; // amount in coins
    currencyCode: string; // ISO-4217
}