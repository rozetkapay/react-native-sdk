import RozetkaPaySDK
import SwiftUI

@objc(RozetkaPaySdk)
class RozetkaPaySdk: NSObject {
  
  @objc(initialize:enableLogging:resolve:reject:)
  func initialize(
    mode: String,
    enableLogging: Bool,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping  RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async {
      do {
        RozetkaPaySDK.RozetkaPaySdk.initSdk(
          appContext: UIApplication.shared,
          mode: try mode.toRozetkaPaySdkMode(),
          enableLogging: enableLogging
        )
        resolver(true)
      } catch let error {
        rejecter("INIT_ERROR", "Failed to initialize RozetkaPaySdk: \(error.localizedDescription)", error)
      }
    }
  }
  
  @objc(startTokenization:fieldsParameters:themeConfigurator:resolver:rejecter:)
  func startTokenization(
    widgetKey: String,
    fieldsParameters: NSDictionary,
    themeConfigurator: NSDictionary,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async {
      guard let rootViewController = UIApplication.shared.getRootViewController() else {
        rejecter("TOKENIZATION_ERROR", "Unable to find root view controller", nil)
        return
      }
      let viewParameters = fieldsParameters.toTokenizationViewParameters()
      let theme = themeConfigurator.toRozetkaPayThemeConfigurator()
      let tokenizationView = RozetkaPaySDK.TokenizationView(
        parameters: TokenizationParameters(
          client: ClientWidgetParameters(
            widgetKey: widgetKey
          ),
          viewParameters: viewParameters,
          themeConfigurator: theme
        ),
        onResultCallback: { result in
          rootViewController.dismiss(animated: true) {
            resolver(result.toDictionary())
          }
        }
      )
      
      let hostingController = UIHostingController(rootView: tokenizationView)
      hostingController.modalPresentationStyle = .fullScreen
      rootViewController.present(hostingController, animated: true, completion: nil)
    }
  }
  
  @objc(makePayment:paymentParameters:themeConfigurator:resolver:rejecter:)
  func makePayment(
    clientAuthParameters: NSDictionary,
    paymentParameters: NSDictionary,
    themeConfigurator: NSDictionary,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async {
      guard let rootViewController = UIApplication.shared.getRootViewController() else {
        rejecter("PAYMENT_ERROR", "Unable to find root view controller", nil)
        return
      }
      guard let client = clientAuthParameters.toClientAuthParameters() else {
        rejecter("PAYMENT_ERROR", "Wrong auth parameters structure, required fields missed", nil)
        return
      }
      guard let parameters = paymentParameters.toPaymentParameters(
        client: client,
        theme: themeConfigurator.toRozetkaPayThemeConfigurator()
      ) else {
        rejecter("PAYMENT_ERROR", "Wrong parameters structure, required fields missed", nil)
        return
      }
      
      let payView = RozetkaPaySDK.PayView(
        paymentParameters: parameters,
        onResultCallback: { result in
          rootViewController.dismiss(animated: true) {
            resolver(result.toDictionary())
          }
        }
      )
      
      let hostingController = UIHostingController(rootView: payView)
      hostingController.modalPresentationStyle = .fullScreen
      rootViewController.present(hostingController, animated: true, completion: nil)
    }
  }
  
  @objc(makeBatchPayment:paymentParameters:themeConfigurator:resolver:rejecter:)
  func makeBatchPayment(
    clientAuthParameters: NSDictionary,
    paymentParameters: NSDictionary,
    themeConfigurator: NSDictionary,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async {
      guard let rootViewController = UIApplication.shared.getRootViewController() else {
        rejecter("BATCH_PAYMENT_ERROR", "Unable to find root view controller", nil)
        return
      }
      guard let client = clientAuthParameters.toClientAuthParameters() else {
        rejecter("BAtCH_PAYMENT_ERROR", "Wrong auth parameters structure, required fields missed", nil)
        return
      }
      guard let parameters = paymentParameters.toBatchPaymentParameters(
        client: client,
        theme: themeConfigurator.toRozetkaPayThemeConfigurator()
      ) else {
        rejecter("BAtCH_PAYMENT_ERROR", "Wrong parameters structure, required fields missed", nil)
        return
      }
      
      let payView = RozetkaPaySDK.PayView(
        batchPaymentParameters:  parameters,
        onResultCallback: { result in
          rootViewController.dismiss(animated: true) {
            resolver(result.toDictionary())
          }
        }
      )
      
      let hostingController = UIHostingController(rootView: payView)
      hostingController.modalPresentationStyle = .fullScreen
      rootViewController.present(hostingController, animated: true, completion: nil)
    }
  }
  
  
  
}

extension UIApplication {
  func getRootViewController() -> UIViewController? {
    return self.connectedScenes
      .compactMap { $0 as? UIWindowScene }
      .flatMap { $0.windows }
      .first { $0.isKeyWindow }?.rootViewController
  }
}
