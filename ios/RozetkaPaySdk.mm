#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RozetkaPaySdk, NSObject)

RCT_EXTERN_METHOD(initialize:(NSString *)mode
                  enableLogging:(BOOL)enableLogging
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
