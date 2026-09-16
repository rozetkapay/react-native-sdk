import Foundation
import RozetkaPaySDK

extension String {
    func toRozetkaPaySdkMode() throws -> RozetkaPaySdkMode {
        switch self.lowercased().trimmingCharacters(in: .whitespacesAndNewlines) {
        case "production":
            return .production
        case "development":
            return .development
        default:
            throw NSError(domain: "RozetkaPaySdk", code: -1, userInfo: [NSLocalizedDescriptionKey: "Unknown RozetkaPaySdk mode: \(self)"])
        }
    }
}

extension Optional where Wrapped == String {
    func toRozetkaPayLanguage() -> RozetkaPayLanguage {
        switch self?.lowercased().trimmingCharacters(in: .whitespacesAndNewlines) {
        case "ukrainian":
            return .ukrainian
        case "english":
            return .english
        default:
            return .system
        }
    }

    func toFieldRequirement(defaultValue: FieldRequirement = .none) -> FieldRequirement {
        switch self?.lowercased().trimmingCharacters(in: .whitespacesAndNewlines) {
        case "required":
            return .required
        case "optional":
            return .optional
        case "none":
            return .none
        default:
            return defaultValue
        }
    }
}
