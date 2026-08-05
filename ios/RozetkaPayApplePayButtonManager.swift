import UIKit
import PassKit

@objc(RozetkaPayApplePayButtonManager)
class RozetkaPayApplePayButtonManager: RCTViewManager {

  override func view() -> UIView! {
    return RozetkaPayApplePayButtonView()
  }

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

class RozetkaPayApplePayButtonView: UIView {

  @objc var onApplePayButtonPress: RCTDirectEventBlock?

  @objc var type: NSNumber = 0 {
    didSet {
      needsRebuild = true
      setNeedsLayout()
    }
  }

  @objc var buttonStyle: NSNumber = 2 {
    didSet {
      needsRebuild = true
      setNeedsLayout()
    }
  }

  @objc var radius: NSNumber = 8 {
    didSet {
      button?.cornerRadius = CGFloat(radius.doubleValue)
    }
  }

  private var button: PKPaymentButton?
  private var needsRebuild = true

  override func layoutSubviews() {
    super.layoutSubviews()
    if needsRebuild {
      rebuildButton()
      needsRebuild = false
    }
    button?.frame = bounds
  }

  private func rebuildButton() {
    button?.removeFromSuperview()

    let buttonType = PKPaymentButtonType(rawValue: type.intValue) ?? .plain
    let style = PKPaymentButtonStyle(rawValue: buttonStyle.intValue) ?? .black

    let newButton = PKPaymentButton(paymentButtonType: buttonType, paymentButtonStyle: style)
    newButton.addTarget(self, action: #selector(handlePress), for: .touchUpInside)
    newButton.frame = bounds
    newButton.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    newButton.cornerRadius = CGFloat(radius.doubleValue)

    addSubview(newButton)
    button = newButton
  }

  @objc private func handlePress() {
    onApplePayButtonPress?([:])
  }
}
