import { NativeModules, Platform } from 'react-native';
import { convertToTokenizationResult } from './models/tokenization/TokenizationResultConverter';
import type { InitParams } from './models/initialization/InitParameters';
import { defaultTokenizationFieldsParameters, type TokenizationParams } from './models/tokenization/TokenizationParameters';

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
    throw new Error('init function is only supported on Android.');
  }
}

/**
 * Starts the tokenization process using the provided widget key.
 * @param params - The parameters for tokenization.
 * @returns A promise that resolves with the tokenization result.
 */
export function startTokenization({ widgetKey, fieldsParameters = defaultTokenizationFieldsParameters }: TokenizationParams): Promise<any> {
  return RozetkaPaySdk
    .startTokenization(widgetKey, fieldsParameters)
    .then(convertToTokenizationResult);
}

export default {
  init,
  startTokenization,
};