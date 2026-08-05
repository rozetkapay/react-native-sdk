import { useMemo } from 'react';
import {
  GooglePayButton,
  GooglePayButtonConstants,
  type GooglePayPaymentMethod,
} from '@google/react-native-make-payment';
import type { RozetkaPayGooglePayButtonProps } from './RozetkaPayGooglePayButtonProps';

const DEFAULT_ALLOWED_AUTH_METHODS = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];
const DEFAULT_ALLOWED_CARD_NETWORKS = ['VISA', 'MASTERCARD'];
const DEFAULT_GATEWAY = 'example';

export function RozetkaPayGooglePayButton({
  googlePayConfig,
  onPress,
  style,
  theme,
  type,
  radius = 4,
  disabled = false,
  allowedAuthMethods = DEFAULT_ALLOWED_AUTH_METHODS,
  allowedCardNetworks = DEFAULT_ALLOWED_CARD_NETWORKS,
}: RozetkaPayGooglePayButtonProps) {
  const allowedPaymentMethods: GooglePayPaymentMethod[] = useMemo(
    () => [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods,
          allowedCardNetworks,
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: googlePayConfig.gateway ?? DEFAULT_GATEWAY,
            gatewayMerchantId: googlePayConfig.merchantId,
          },
        },
      },
    ],
    [
      allowedAuthMethods,
      allowedCardNetworks,
      googlePayConfig.gateway,
      googlePayConfig.merchantId,
    ]
  );

  if (!GooglePayButtonConstants) {
    return null;
  }

  return (
    <GooglePayButton
      style={style}
      onPress={onPress}
      disabled={disabled}
      allowedPaymentMethods={allowedPaymentMethods}
      theme={theme ?? GooglePayButtonConstants.Themes.Dark}
      type={type ?? GooglePayButtonConstants.Types.Pay}
      radius={radius}
    />
  );
}
