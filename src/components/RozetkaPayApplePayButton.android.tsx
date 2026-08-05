import type { RozetkaPayApplePayButtonProps } from './RozetkaPayApplePayButtonProps';

/** Apple Pay is not applicable on Android; renders nothing, same as `isApplePayAvailable` resolving to `false`. */
export function RozetkaPayApplePayButton(
  _props: RozetkaPayApplePayButtonProps
) {
  return null;
}
