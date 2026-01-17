<img src="https://github.com/user-attachments/assets/6319f2c7-bdc8-4381-b866-5609bacc6e6c" alt="drawing" width="400"/>

# RozetkaPay SDK for React Native

[![NPM Version](https://img.shields.io/npm/v/%40rozetkapay%2Frozetka-pay-sdk-react-native)](https://www.npmjs.com/package/@rozetkapay/rozetka-pay-sdk-react-native)

The RozetkaPay SDK makes adding a smooth payment experience to your React Native application easy. Our SDK offers customizable UI components for securely collecting card details and supports complete payment flows, including Google Pay/Apple Pay, for seamless transactions.

## Installation

To install the RozetkaPay SDK in your React Native project, follow these steps:

```bash
yarn add @rozetkapay/rozetka-pay-sdk-react-native
or
npm install @rozetkapay/rozetka-pay-sdk-react-native
```

For more information about using and configuring the library, please visit the [Wiki](https://github.com/rozetkapay/react-native-sdk/wiki).

## Native Libraries

The RozetkaPay SDK relies on native libraries for platform-specific functionality. Below are the libraries used under the hood:

- **iOS**: [RozetkaPay iOS SDK](https://github.com/rozetkapay/ios-sdk)  
  Version: `0.3.7`

- **Android**: [RozetkaPay Android SDK](https://github.com/rozetkapay/android-sdk)  
  Version: `0.3.6`

These libraries are integrated seamlessly into the React Native SDK to provide a consistent and reliable payment experience across platforms.

### iOS Setup

The RozetkaPay SDK uses **Swift Package Manager (SPM)** under the hood to implement all required functionality for iOS. To ensure proper integration, you need to install CocoaPods with the `USE_FRAMEWORKS=dynamic` option. This is required for SPM dependencies to work correctly in a React Native project.

Run the following command in your iOS project directory:

```bash
USE_FRAMEWORKS=dynamic pod install
```

This ensures that the SDK and its dependencies are correctly linked and ready to use in your iOS application.


## License

MIT
