import type { RozetkaPayGooglePayButtonProps } from './RozetkaPayGooglePayButtonProps';

/** Google Pay is not applicable on iOS; renders nothing, same as `isGooglePayAvailable` resolving to `false`. */
export function RozetkaPayGooglePayButton(
  _props: RozetkaPayGooglePayButtonProps
) {
  return null;
}
