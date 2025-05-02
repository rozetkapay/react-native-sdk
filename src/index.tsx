import { NativeModules, Platform } from 'react-native';
import { convertToTokenizationResult } from './models/tokenization/TokenizationResultConverter';
import type { InitParams } from './models/initialization/InitParameters';
import { type StartTokenizationParams } from './models/tokenization/TokenizationParameters';
import { defaultThemeConfigurator } from './models/theme/ThemeConfigurator';
import type { TokenizationResult } from './models/tokenization/TokenizationResult';
import type { MakePaymentParams } from './models/payment/PaymentParameters';
import { convertToPaymentResult } from './models/payment/PaymentResultConverter';
import type { PaymentResult } from './models/payment/PaymentResult';
import { defaultCardPaymentFieldsParameters } from './models/CardPaymentFieldsParameters';

const LINKING_ERROR =
  `The package 'react-native-rozetka-pay-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const RozetkaPaySdk = NativeModules.RozetkaPaySdk
  ? NativeModules.RozetkaPaySdk
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );


/**
 * Initializes the RozetkaPaySdk with the given parameters.
 * @param params - The parameters for initialization.
 */
export function init(params: InitParams): Promise<void> {
  if (Platform.OS === 'android') {
    return RozetkaPaySdk.init(params.mode, params.enableLogging);
  } else {
    return RozetkaPaySdk.initialize(params.mode, params.enableLogging);
  }
}

/**
 * Starts the tokenization process
 * @param params - The parameters for tokenization.
 * @returns A promise that resolves with the tokenization result.
 */
export function startTokenization({
  widgetKey,
  fieldsParameters = defaultCardPaymentFieldsParameters,
  themeConfigurator = defaultThemeConfigurator,
}: StartTokenizationParams): Promise<TokenizationResult> {
  return RozetkaPaySdk
    .startTokenization(widgetKey, fieldsParameters, themeConfigurator)
    .then(convertToTokenizationResult);
}

/**
 * Starts the payment process
 * @param params - The parameters for payment. 
 * @returns A promise that resolves with the payment result.
 */
export function makePayment({
  token,
  widgetKey,
  fieldsParameters = defaultCardPaymentFieldsParameters,
  paymentParameters,
  themeConfigurator = defaultThemeConfigurator,
}: MakePaymentParams): Promise<PaymentResult> {
  return RozetkaPaySdk
    .makePayment(token, widgetKey, fieldsParameters, paymentParameters, themeConfigurator)
    .then(convertToPaymentResult);
}

export { RozetkaPaySdkMode } from './models/initialization/InitParameters';
export type { InitParams } from './models/initialization/InitParameters';
export type { MakePaymentParams, AmountParameters, PaymentParameters } from './models/payment/PaymentParameters';
export { GooglePayConfig } from './models/payment/GooglePayConfig';
export type { PaymentResult, PendingPaymentResult, CompletePaymentResult, FailedPaymentResult, CancelledPaymentResult } from './models/payment/PaymentResult';
export { FieldRequirement } from './models/FieldRequirement';
export type { TokenizationResult } from './models/tokenization/TokenizationResult';
export type { StartTokenizationParams } from './models/tokenization/TokenizationParameters';
export type { CardPaymentFieldsParameters } from './models/CardPaymentFieldsParameters';
export { defaultCardPaymentFieldsParameters } from './models/CardPaymentFieldsParameters';
export type { DomainColorScheme, DomainSizes, ThemeConfigurator } from './models/theme/ThemeConfigurator';
export { defaultThemeConfigurator } from './models/theme/ThemeConfigurator';


export default {
  init,
  startTokenization,
  makePayment,
};
