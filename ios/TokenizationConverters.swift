import Foundation
import RozetkaPaySDK

extension Result where Success == TokenizedCard, Failure == TokenizationError {
    func toDictionary() -> [String: Any] {
        switch self {
        case .success(let tokenizedCard):
            return tokenizedCard.toDictionary()
        case .failure(let error):
            return error.toDictionary()
        }
    }
}

extension TokenizedCard {
    func toDictionary() -> [String: Any] {
        return [
            "type": "Complete",
            "tokenizedCard": [
              "token": self.token,
              "name": self.name ?? "",
              "cardInfo": self.cardInfo?.toDictionary() ?? [:]
          ]
        ]
    }
}

extension TokenizedCard.CardInfo {
    func toDictionary() -> [String: Any] {
        return [
            "maskedNumber": self.maskedNumber ?? "",
            "paymentSystem": self.paymentSystem ?? "",
            "bank": self.bank ?? "",
            "isoA3Code": self.isoA3Code ?? "",
            "cardType": self.cardType ?? ""
        ]
    }
}

extension TokenizationError {
    func toDictionary() -> [String: Any] {
        switch self {
        case .cancelled:
            return [
                "type": "Cancelled"
            ]
        case .failed(let message, let errorDescription):
            return [
                "type": "Failed",
                "message": message ?? "Unknown error",
                "error": errorDescription ?? "No error description"
            ]
        }
    }
}

extension NSDictionary {
    func toTokenizationViewParameters() -> TokenizationViewParameters {
        return TokenizationViewParameters(
            cardNameField: (self["cardNameField"] as? String).toFieldRequirement(),
            emailField: (self["emailField"] as? String).toFieldRequirement(),
            cardholderNameField: (self["cardholderNameField"] as? String).toFieldRequirement()
        )
    }
}
