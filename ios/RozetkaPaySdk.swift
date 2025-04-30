import RozetkaPaySDK

@objc(RozetkaPaySdk)
class RozetkaPaySdk: NSObject {
  
  @objc(initialize:enableLogging:resolve:reject:)
  func initialize(
    mode: String,
    enableLogging: Bool,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping  RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async {
      do {
        RozetkaPaySDK.RozetkaPaySdk.initSdk(
          appContext: UIApplication.shared,
          mode: try mode.toRozetkaPaySdkMode(),
          enableLogging: enableLogging
        )
        resolve(nil)
      } catch let error {
        reject("INIT_ERROR", "Failed to initialize RozetkaPaySdk: \(error.localizedDescription)", error)
      }
    }
  }
}
