import { NativeModules, Platform } from 'react-native';
import { convertToTokenizationResult } from './models/tokenization/TokenizationResultConverter';
import type { InitParams } from './models/initialization/InitParameters';
import { type StartTokenizationParams } from './models/tokenization/TokenizationParameters';
import { defaultThemeConfigurator } from './models/theme/ThemeConfigurator';
import type { TokenizationResult } from './models/tokenization/TokenizationResult';
import type { MakePaymentParams } from './models/payment/regular/PaymentParameters';
import { convertToPaymentResult } from './models/payment/regular/PaymentResultConverter';
import type { PaymentResult } from './models/payment/regular/PaymentResult';
import { defaultCardPaymentFieldsParameters } from './models/CardPaymentFieldsParameters';
import type { BatchPaymentResult } from './models/payment/batch/BatchPaymentResult';
import type { MakeBatchPaymentParams } from './models/payment/batch/BatchPaymentParameters';
import { convertToBatchPaymentResult } from './models/payment/batch/BatchPaymentResultConverter';
import type { GooglePayConfig } from './models/payment/GooglePayConfig';
import type { ApplePayConfig } from './models/payment/ApplePayConfig';

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
    return RozetkaPaySdk.init(
      params.mode,
      params.enableLogging,
      params.apiLanguage
    );
  } else {
    return RozetkaPaySdk.initialize(
      params.mode,
      params.enableLogging,
      params.apiLanguage
    );
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
  return RozetkaPaySdk.startTokenization(
    widgetKey,
    fieldsParameters,
    themeConfigurator
  ).then(convertToTokenizationResult);
}

/**
 * Starts the payment process
 * @param params - The parameters for payment.
 * @returns A promise that resolves with the payment result.
 */
export function makePayment({
  clientAuthParameters,
  paymentParameters,
  themeConfigurator = defaultThemeConfigurator,
}: MakePaymentParams): Promise<PaymentResult> {
  return RozetkaPaySdk.makePayment(
    clientAuthParameters,
    paymentParameters,
    themeConfigurator
  ).then(convertToPaymentResult);
}

/**
 * Starts the batch payment process
 * @param params - The parameters for batch payment.
 * @returns A promise that resolves with the batch payment result.
 */
export function makeBatchPayment({
  clientAuthParameters,
  paymentParameters,
  themeConfigurator = defaultThemeConfigurator,
}: MakeBatchPaymentParams): Promise<BatchPaymentResult> {
  return RozetkaPaySdk.makeBatchPayment(
    clientAuthParameters,
    paymentParameters,
    themeConfigurator
  ).then(convertToBatchPaymentResult);
}

/**
 * Checks whether Google Pay can be used on this device with the given configuration.
 * Use this to decide whether to show your own Google Pay button before calling
 * `makePayment`/`makeBatchPayment` with `PaymentTypeConfiguration.googlePayPayment(...)`.
 *
 * Always resolves to `false` on iOS, where Google Pay is not applicable.
 * @param googlePayConfig - The Google Pay configuration to check availability for.
 */
export function isGooglePayAvailable(
  googlePayConfig: GooglePayConfig
): Promise<boolean> {
  if (Platform.OS !== 'android') {
    return Promise.resolve(false);
  }
  return RozetkaPaySdk.isGooglePayAvailable(googlePayConfig);
}

/**
 * Checks whether Apple Pay can be used on this device with the given configuration.
 * Use this to decide whether to show your own Apple Pay button before calling
 * `makePayment`/`makeBatchPayment` with `PaymentTypeConfiguration.applePayPayment(...)`.
 *
 * Always resolves to `false` on Android, where Apple Pay is not applicable.
 * @param applePayConfig - The Apple Pay configuration to check availability for.
 */
export function isApplePayAvailable(
  applePayConfig: ApplePayConfig
): Promise<boolean> {
  if (Platform.OS !== 'ios') {
    return Promise.resolve(false);
  }
  return RozetkaPaySdk.isApplePayAvailable(applePayConfig);
}

export {
  RozetkaPaySdkMode,
  RozetkaPayApiLanguage,
} from './models/initialization/InitParameters';
export type { InitParams } from './models/initialization/InitParameters';
export type {
  MakePaymentParams,
  AmountParameters,
  PaymentParameters,
} from './models/payment/regular/PaymentParameters';
export { GooglePayConfig } from './models/payment/GooglePayConfig';
export { ApplePayConfig } from './models/payment/ApplePayConfig';
export type {
  PaymentResult,
  PendingPaymentResult,
  CompletePaymentResult,
  FailedPaymentResult,
  CancelledPaymentResult,
} from './models/payment/regular/PaymentResult';
export { FieldRequirement } from './models/FieldRequirement';
export type { TokenizationResult } from './models/tokenization/TokenizationResult';
export type { StartTokenizationParams } from './models/tokenization/TokenizationParameters';
export type { CardPaymentFieldsParameters } from './models/CardPaymentFieldsParameters';
export { defaultCardPaymentFieldsParameters } from './models/CardPaymentFieldsParameters';
export type {
  DomainColorScheme,
  DomainSizes,
  ThemeConfigurator,
} from './models/theme/ThemeConfigurator';
export {
  defaultThemeConfigurator,
  DomainTextStyle,
  DomainTypography,
  ThemeMode,
} from './models/theme/ThemeConfigurator';
export { PaymentTypeConfiguration } from './models/payment/PaymentTypeConfiguration';
export type {
  MakeBatchPaymentParams,
  BatchPaymentParameters,
  BatchOrder,
} from './models/payment/batch/BatchPaymentParameters';
export type {
  BatchPaymentResult,
  BatchPendingPaymentResult,
  BatchCompletePaymentResult,
  BatchFailedPaymentResult,
  BatchCancelledPaymentResult,
  BatchOrderPaymentResult,
} from './models/payment/batch/BatchPaymentResult';
export { RozetkaPayGooglePayButton } from './components/RozetkaPayGooglePayButton';
export type { RozetkaPayGooglePayButtonProps } from './components/RozetkaPayGooglePayButtonProps';
export { RozetkaPayApplePayButton } from './components/RozetkaPayApplePayButton';
export type { RozetkaPayApplePayButtonProps } from './components/RozetkaPayApplePayButtonProps';

export default {
  init,
  startTokenization,
  makePayment,
  makeBatchPayment,
  isGooglePayAvailable,
  isApplePayAvailable,
};
