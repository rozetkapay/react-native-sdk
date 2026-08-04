import type { StyleProp, ViewStyle } from 'react-native';

export interface RozetkaPayApplePayButtonProps {
  /**
   * Called when the button is tapped. Trigger `makePayment`/`makeBatchPayment` with
   * `PaymentTypeConfiguration.applePayPayment(applePayConfig)` here — this component
   * only renders the button, RozetkaPaySdk still owns the entire payment flow.
   */
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  /** `PKPaymentButtonType` raw value (button label, e.g. plain/buy/checkout). Defaults to `.plain` (0). */
  type?: number;
  /** `PKPaymentButtonStyle` raw value (visual look, e.g. black/white/whiteOutline/automatic). Defaults to `.black` (2). */
  buttonStyle?: number;
  /** Corner radius, in points. Defaults to `8`. */
  radius?: number;
}
