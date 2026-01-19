import Foundation
import PassKit
import RozetkaPaySDK


extension PaymentResult {
  func toDictionary() -> [String: Any?] {
    switch self {
    case .pending(let externalId, let paymentId, _, _):
      return [
        "type": "Pending",
        "externalId": externalId,
        "paymentId": paymentId ?? ""
      ]
    case .complete(let externalId, let paymentId, let tokenizedCard):
      return [
        "type": "Complete",
        "externalId": externalId,
        "paymentId": paymentId,
        "tokenizedCard": tokenizedCard?.toDictionary() ?? nil
      ]
    case .failed(let error):
      return [
        "type": "Failed",
        "paymentId": error.paymentId ?? "",
        "message": error.message ?? "",
        "error": error.errorDescription ?? ""
      ]
    case .cancelled(_, _):
      return [
        "type": "Cancelled"
      ]
    }
  }
}

extension BatchPaymentResult {
  func toDictionary() -> [String: Any?] {
    switch self {
    case .pending(let externalId, let ordersPayments, _, _):
      return [
        "type": "Pending",
        "externalId": externalId,
        "ordersPayments": ordersPayments?.toArrayOfDictionary()
      ]
    case .complete(let externalId, let ordersPayments, let tokenizedCard):
      return [
        "type": "Complete",
        "externalId": externalId,
        "tokenizedCard": tokenizedCard?.toDictionary() ?? nil,
        "ordersPayments": ordersPayments?.toArrayOfDictionary()
      ]
    case .failed(_, let error, let ordersPayments):
      return [
        "type": "Failed",
        "message": error.message ?? "",
        "error": error.errorDescription ?? "",
        "ordersPayments": ordersPayments?.toArrayOfDictionary()
      ]
    case .cancelled:
      return [
        "type": "Cancelled"
      ]
    }
  }
}

extension [BatchOrderPaymentResult] {
  func toArrayOfDictionary() -> [[String: Any]]{
    return self.compactMap({ $0.toDictionary() })
  }
}
  

extension BatchOrderPaymentResult {
  func toDictionary() -> [String: Any]{
    return [
      "externalId": self.externalId,
      "operationId": self.operationId
    ]
  }
}

extension NSDictionary {
  
  func toClientAuthParameters() -> ClientAuthParameters? {
    guard
      let token = self["token"] as? String,
      let widgetKey = self["widgetKey"] as? String
    else {
      return nil
    }
    
    return ClientAuthParameters(
      token: token,
      widgetKey: widgetKey
    )
  }
  
  func toPaymentParameters(
    client: ClientAuthParameters,
    theme: RozetkaPayThemeConfigurator
  ) -> PaymentParameters? {
    guard
      let amountDict = self["amountParameters"] as? [String: Any],
      let amount = amountDict["amount"] as? Int64,
      let currencyCode = amountDict["currencyCode"] as? String,
      let externalId = self["externalId"] as? String,
      let paymentType = (self["paymentType"] as? NSDictionary)?.toPaymentTypeConfiguration()
    else {
      return nil
    }
    
    return PaymentParameters(
      client: client,
      themeConfigurator: theme,
      paymentType: paymentType,
      amountParameters: AmountParameters(
        amount: amount,
        tax: 0,
        total: amount,
        currencyCode: currencyCode
      ),
      externalId: externalId,
      callbackUrl: self["callbackUrl"] as? String
    )
  }
  
  func toBatchPaymentParameters(
    client: ClientAuthParameters,
    theme: RozetkaPayThemeConfigurator
  ) -> BatchPaymentParameters? {
    guard
      let currencyCode = self["currencyCode"] as? String,
      let externalId = self["externalId"] as? String,
      let paymentType = (self["paymentType"] as? NSDictionary)?.toPaymentTypeConfiguration(),
      let ordersArray = (self["orders"] as? NSArray)?.compactMap({$0 as? NSDictionary})
    else {
      return nil
    }
    
    let orders = ordersArray.compactMap({$0.toBatchOrder()})
    let amount = ordersArray.compactMap ({$0["amount"] as? Int64}).reduce(0, +)
    
    return BatchPaymentParameters(
      client: client,
      themeConfigurator: theme,
      paymentType: paymentType,
      amountParameters:AmountParameters(
        amount: amount,
        tax: 0,
        total: amount,
        currencyCode: currencyCode
      ),
      externalId: externalId,
      callbackUrl: self["callbackUrl"] as? String,
      orders: orders
    )
  }
  
  func toBatchOrder() -> BatchOrder? {
    guard
      let apiKey = self["apiKey"] as? String,
      let externalId = self["externalId"] as? String,
      let description = self["description"] as? String,
      let amount = self["amount"] as? Int64
    else {
      return nil
    }
    return BatchOrder(
      apiKey: apiKey,
      amountInCoins: amount,
      description: description,
      externalId: externalId
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
        supportedNetworks: self["supportedNetworks"] as? [String],
        merchantCapabilities: self["merchantCapabilities"] as? [String],
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
  
  func toPaymentTypeConfiguration() -> PaymentTypeConfiguration? {
    guard let type = self["type"] as? String else { return nil }
    switch type {
    case "RegularPayment":
      guard
        let viewParameters = (self["cardFieldsParameters"] as? NSDictionary)?.toPaymentViewParameters(),
        let allowTokenization = self["allowTokenization"] as? Bool
      else {
        return nil
      }
      
      let applePayConfig = (self["applePayConfig"] as? NSDictionary)?.toApplePayConfig()
      return .regular(RegularPayment(
        viewParameters: viewParameters,
        isAllowTokenization: allowTokenization,
        applePayConfig: applePayConfig
      ))
    case "SingleTokenPayment":
      guard let token = self["token"] as? String else { return nil }
      return .singleToken(SingleTokenPayment(token: token))
    default:
      return nil
    }
  }
  
}
