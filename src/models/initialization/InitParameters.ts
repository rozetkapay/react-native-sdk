export type InitParams = {
  mode: RozetkaPaySdkMode;
  enableLogging: boolean;
  apiLanguage?: RozetkaPayApiLanguage;
};

export enum RozetkaPaySdkMode {
  Production = 'Production',
  Development = 'Development',
}

/**
 * Language of the payment status descriptions returned by the API.
 * Defaults to `System` (follows the device/app language) when omitted.
 */
export enum RozetkaPayApiLanguage {
  System = 'system',
  Ukrainian = 'ukrainian',
  English = 'english',
}
