import type { defaultCardPaymentFieldsParameters } from '../CardPaymentFieldsParameters';
import type { ApplePayConfig } from './ApplePayConfig';
import type { GooglePayConfig } from './GooglePayConfig';

export type PaymentTypeConfiguration =
  | PaymentTypeConfiguration.RegularPayment
  | PaymentTypeConfiguration.SingleTokenPayment
  | PaymentTypeConfiguration.GooglePayPayment
  | PaymentTypeConfiguration.ApplePayPayment;

export namespace PaymentTypeConfiguration {
  export interface Base {
    type:
      | 'RegularPayment'
      | 'SingleTokenPayment'
      | 'GooglePayPayment'
      | 'ApplePayPayment';
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

  /**
   * Launches the payment flow directly into Apple Pay, skipping the card-form /
   * payment-method-selection UI. Intended to be used together with an Apple Pay button
   * rendered by the host app, gated on {@link isApplePayAvailable}.
   */
  export interface ApplePayPayment extends Base {
    type: 'ApplePayPayment';
    applePayConfig: ApplePayConfig;
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
      applePayConfig,
    };
  }

  export function singleTokenPayment(token: string): SingleTokenPayment {
    return {
      type: 'SingleTokenPayment',
      token,
    };
  }

  export function googlePayPayment(
    googlePayConfig: GooglePayConfig
  ): GooglePayPayment {
    return {
      type: 'GooglePayPayment',
      googlePayConfig,
    };
  }

  export function applePayPayment(
    applePayConfig: ApplePayConfig
  ): ApplePayPayment {
    return {
      type: 'ApplePayPayment',
      applePayConfig,
    };
  }
}
