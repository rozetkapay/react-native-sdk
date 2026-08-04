import type { StyleProp, ViewStyle } from 'react-native';
import type { GooglePayConfig } from '../models/payment/GooglePayConfig';

export interface RozetkaPayGooglePayButtonProps {
  /** Same config you'd pass to `PaymentTypeConfiguration.googlePayPayment(...)` / `isGooglePayAvailable(...)`. */
  googlePayConfig: GooglePayConfig;
  /**
   * Called when the button is tapped. Trigger `makePayment`/`makeBatchPayment` with
   * `PaymentTypeConfiguration.googlePayPayment(googlePayConfig)` here — this component
   * only renders the button, RozetkaPaySdk still owns the entire payment flow.
   */
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  /** Defaults to `GooglePayButtonConstants.Themes.Dark`. Import `GooglePayButtonConstants` from `@google/react-native-make-payment` to override. */
  theme?: number;
  /** Defaults to `GooglePayButtonConstants.Types.Buy`. Import `GooglePayButtonConstants` from `@google/react-native-make-payment` to override. */
  type?: number;
  radius?: number;
  disabled?: boolean;
  allowedAuthMethods?: string[];
  allowedCardNetworks?: string[];
}
