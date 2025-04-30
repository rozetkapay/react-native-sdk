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
