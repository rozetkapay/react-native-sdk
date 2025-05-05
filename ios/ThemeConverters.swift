import Foundation
import SwiftUICore
import RozetkaPaySDK


extension NSDictionary {
  
  func toRozetkaPayThemeConfigurator() -> RozetkaPayThemeConfigurator {
    let defaultSizes = RozetkaPayDomainThemeDefaults.sizes()
    let defaultLightColorScheme = RozetkaPayDomainThemeDefaults.lightColors()
    let defaulDarkColorScheme = RozetkaPayDomainThemeDefaults.darkColors()
    return RozetkaPayThemeConfigurator(
      lightColorScheme: (self["lightColorScheme"] as? NSDictionary)?.toDomainColorScheme(defaultColorScheme: defaultLightColorScheme) ?? defaultLightColorScheme,
      darkColorScheme: (self["darkColorScheme"] as? NSDictionary)?.toDomainColorScheme(defaultColorScheme: defaulDarkColorScheme) ?? defaulDarkColorScheme,
      sizes: (self["sizes"] as? NSDictionary)?.toDomainSizes(defaultSizes: defaultSizes) ?? defaultSizes
    )
  }
  
  func toDomainSizes(defaultSizes: DomainSizes) -> DomainSizes {
    return DomainSizes(
      sheetCornerRadius: CGFloat(self["sheetCornerRadius"] as? Int ?? Int(defaultSizes.sheetCornerRadius)),
      componentCornerRadius: CGFloat(self["componentCornerRadius"] as? Int ?? Int(defaultSizes.componentCornerRadius)),
      buttonCornerRadius: CGFloat(self["buttonCornerRadius"] as? Int ?? Int(defaultSizes.buttonCornerRadius)),
      textFieldFrameHeight: defaultSizes.textFieldFrameHeight,
      borderWidth: CGFloat(self["borderWidth"] as? Int ?? Int(defaultSizes.borderWidth))
    )
  }
  
  func toDomainColorScheme(defaultColorScheme: DomainColorScheme) -> DomainColorScheme {
    return DomainColorScheme(
      surface: self.getColor("surface") ?? defaultColorScheme.surface,
      onSurface: self.getColor("onSurface") ?? defaultColorScheme.onSurface,
      appBarIcon: self.getColor("appBarIcon") ?? defaultColorScheme.appBarIcon,
      title: self.getColor("title") ?? defaultColorScheme.title,
      subtitle: self.getColor("subtitle") ?? defaultColorScheme.subtitle,
      error: self.getColor("error") ?? defaultColorScheme.error,
      primary: self.getColor("primary") ?? defaultColorScheme.primary,
      onPrimary: self.getColor("onPrimary") ?? defaultColorScheme.onPrimary,
      placeholder: self.getColor("placeholder") ?? defaultColorScheme.placeholder,
      componentSurface: self.getColor("componentSurface") ?? defaultColorScheme.componentSurface,
      componentDivider: self.getColor("componentDivider") ?? defaultColorScheme.componentDivider,
      onComponent: self.getColor("onComponent") ?? defaultColorScheme.onComponent,
      applePayButtonStyle: defaultColorScheme.applePayButtonStyle
    )
  }
  
  private func getColor(_ name: String) -> Color? {
    guard let hexString = self[name] as? String else { return nil }
    return Color(hex: hexString)
  }
  
}
