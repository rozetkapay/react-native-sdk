import { requireNativeComponent, type ViewProps } from 'react-native';
import type { RozetkaPayApplePayButtonProps } from './RozetkaPayApplePayButtonProps';

interface NativeProps extends ViewProps {
  type?: number;
  buttonStyle?: number;
  radius?: number;
  onApplePayButtonPress?: () => void;
}

const RozetkaPayApplePayButtonNative = requireNativeComponent<NativeProps>(
  'RozetkaPayApplePayButton'
);

export function RozetkaPayApplePayButton({
  onPress,
  style,
  type,
  buttonStyle,
  radius,
}: RozetkaPayApplePayButtonProps) {
  return (
    <RozetkaPayApplePayButtonNative
      style={style}
      type={type}
      buttonStyle={buttonStyle}
      radius={radius}
      onApplePayButtonPress={onPress}
    />
  );
}
