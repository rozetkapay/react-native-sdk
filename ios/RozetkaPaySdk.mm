#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RozetkaPaySdk, NSObject)

RCT_EXTERN_METHOD(initialize:(NSString *)mode
                  enableLogging:(BOOL)enableLogging
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(startTokenization:(NSString *)widgetKey
                  fieldsParameters:(NSDictionary *)fieldsParameters
                  themeConfigurator:(NSDictionary *)themeConfigurator
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(makePayment:(NSDictionary *)clientAuthParameters
                  paymentParameters:(NSDictionary *)paymentParameters
                  themeConfigurator:(NSDictionary *)themeConfigurator
                  resolver:(RCTPromiseResolveBlock)resolver
                  rejecter:(RCTPromiseRejectBlock)rejecter)

RCT_EXTERN_METHOD(makeBatchPayment:(NSDictionary *)clientAuthParameters
                  paymentParameters:(NSDictionary *)paymentParameters
                  themeConfigurator:(NSDictionary *)themeConfigurator
                  resolver:(RCTPromiseResolveBlock)resolver
                  rejecter:(RCTPromiseRejectBlock)rejecter)


+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
