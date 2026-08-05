#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(RozetkaPayApplePayButtonManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(type, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(buttonStyle, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(radius, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(onApplePayButtonPress, RCTDirectEventBlock)

@end
