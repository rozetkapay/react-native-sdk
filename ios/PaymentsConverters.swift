import Foundation
import PassKit
import RozetkaPaySDK


extension PaymentResult {
  func toDictionary() -> [String: Any] {
    switch self {
    case .pending(let orderId, let paymentId, _, _):
      return [
        "type": "Pending",
        "orderId": orderId,
        "paymentId": paymentId ?? ""
      ]
    case .complete(let orderId, let paymentId):
      return [
        "type": "Complete",
        "orderId": orderId,
        "paymentId": paymentId
      ]
    case .failed(let error):
      return [
        "type": "Failed",
        "paymentId": error.paymentId ?? "",
        "message": error.message ?? "",
        "error": error.errorDescription ?? ""
      ]
    case .cancelled:
      return [
        "type": "Cancelled"
      ]
    }
  }
}

extension NSDictionary {
  
  func toPaymentParameters(
    token: String,
    widgetKey: String,
    paymentViewParameters: PaymentViewParameters,
    theme: RozetkaPayThemeConfigurator
  ) -> PaymentParameters? {
    guard
      let amountDict = self["amountParameters"] as? [String: Any],
      let amount = amountDict["amount"] as? Int64,
      let currencyCode = amountDict["currencyCode"] as? String,
      let orderId = self["orderId"] as? String,
      let allowTokenization = self["allowTokenization"] as? Bool
    else {
      return nil
    }
    
    return PaymentParameters(
      client: ClientAuthParameters(token: token, widgetKey: widgetKey),
      viewParameters: paymentViewParameters,
      themeConfigurator: theme,
      amountParameters: PaymentParameters.AmountParameters(
        amount: amount,
        tax: 0,
        total: amount,
        currencyCode: currencyCode
      ),
      orderId: orderId,
      callbackUrl: self["callbackUrl"] as? String,
      isAllowTokenization: allowTokenization,
      applePayConfig: (self["applePayConfig"] as? NSDictionary)?.toApplePayConfig()
    )
  }
  
  func toApplePayConfig() -> ApplePayConfig? {
    guard
      let type = self["type"] as? String,
      let merchantIdentifier = self["merchantIdentifier"] as? String,
      let merchantName = self["merchantName"] as? String
    else {
      return nil
    }
    
    if type == "Test" {
      return ApplePayConfig.Test(
        merchantIdentifier: merchantIdentifier,
        merchantName: merchantName,
        currencyCode: self["currencyCode"] as? String,
        countryCode: self["countryCode"] as? String
      )
    } else if type == "Production" {
      return ApplePayConfig.Production(
        merchantIdentifier: merchantIdentifier,
        merchantName: merchantName,
        supportedNetworks: (self["supportedNetworks"] as? [String])?.compactMap { PKPaymentNetwork(rawValue: $0) } ?? [],
        merchantCapabilities: PKMerchantCapability(rawValue: self["merchantCapabilities"] as? UInt ?? PKMerchantCapability.capability3DS.rawValue),
        currencyCode: self["currencyCode"] as? String,
        countryCode: self["countryCode"] as? String
      )
    }
    
    return nil
  }
  
  
  func toPaymentViewParameters() -> PaymentViewParameters {
      return PaymentViewParameters(
          cardNameField: (self["cardNameField"] as? String).toFieldRequirement(),
          emailField: (self["emailField"] as? String).toFieldRequirement(),
          cardholderNameField: (self["cardholderNameField"] as? String).toFieldRequirement()
      )
  }
  
}
