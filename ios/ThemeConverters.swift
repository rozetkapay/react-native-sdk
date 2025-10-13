import Foundation
import SwiftUI
import RozetkaPaySDK


extension NSDictionary {
  
  func toRozetkaPayThemeConfigurator() -> RozetkaPayThemeConfigurator {
    let defaultSizes = RozetkaPayDomainThemeDefaults.sizes()
    let defaultLightColorScheme = RozetkaPayDomainThemeDefaults.lightColors()
    let defaulDarkColorScheme = RozetkaPayDomainThemeDefaults.darkColors()
    let defaultTypography = RozetkaPayDomainThemeDefaults.typography()
    return RozetkaPayThemeConfigurator(
      mode: (self["mode"] as? String).toThemeMode(default: ThemeMode.system),
      lightColorScheme: (self["lightColorScheme"] as? NSDictionary)?.toDomainColorScheme(defaultColorScheme: defaultLightColorScheme) ?? defaultLightColorScheme,
      darkColorScheme: (self["darkColorScheme"] as? NSDictionary)?.toDomainColorScheme(defaultColorScheme: defaulDarkColorScheme) ?? defaulDarkColorScheme,
      sizes: (self["sizes"] as? NSDictionary)?.toDomainSizes(defaultSizes: defaultSizes) ?? defaultSizes,
      typography: (self["typography"] as? NSDictionary)?.toDomainTypography(defaultDomainTypography: defaultTypography) ?? defaultTypography
    )
  }
  
  func toDomainSizes(defaultSizes: DomainSizes) -> DomainSizes {
    return DomainSizes(
      sheetCornerRadius: CGFloat(self["sheetCornerRadius"] as? Int ?? Int(defaultSizes.sheetCornerRadius)),
      componentCornerRadius: CGFloat(self["componentCornerRadius"] as? Int ?? Int(defaultSizes.componentCornerRadius)),
      buttonCornerRadius: CGFloat(self["buttonCornerRadius"] as? Int ?? Int(defaultSizes.buttonCornerRadius)),
      buttonFrameHeight: CGFloat(self["buttonHeight"] as? Int ?? Int(defaultSizes.buttonFrameHeight)),
      applePayButtonFrameHeight: CGFloat(self["applePayButtonHeight"] as? Int ?? Int(defaultSizes.applePayButtonFrameHeight)),
      textFieldFrameHeight: CGFloat(self["inputHeight"] as? Int ?? Int(defaultSizes.textFieldFrameHeight)),
      borderWidth: CGFloat(self["borderWidth"] as? Int ?? Int(defaultSizes.borderWidth)),
      cardInfoTopPadding: defaultSizes.cardInfoTopPadding,
      cardFormFooterEmbeddedContentTopPadding: defaultSizes.cardFormFooterEmbeddedContentTopPadding,
      mainButtonTopPadding: CGFloat(self["mainButtonTopPadding"] as? Int ?? Int(defaultSizes.mainButtonTopPadding)),
      cardInfoLegalViewTopPadding: defaultSizes.cardInfoLegalViewTopPadding
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
  
  func toDomainTypography(defaultDomainTypography: DomainTypography) -> DomainTypography {
    let fontFamily = (self["fontFamily"] as? String).toFontFamily()
    return DomainTypography(
      fontFamily: fontFamily,
      titleTextStyle: getDomainTextStyle(name: "titleTextStyle", fontFamily: fontFamily) ?? defaultDomainTypography.titleTextStyle,
      subtitleTextStyle: getDomainTextStyle(name: "subtitleTextStyle", fontFamily: fontFamily) ?? defaultDomainTypography.subtitleTextStyle,
      bodyTextStyle: getDomainTextStyle(name: "bodyTextStyle", fontFamily: fontFamily) ?? defaultDomainTypography.bodyTextStyle,
      labelSmallTextStyle: getDomainTextStyle(name: "labelSmallTextStyle", fontFamily: fontFamily) ?? defaultDomainTypography.labelSmallTextStyle,
      labelLargeTextStyle: getDomainTextStyle(name: "labelLargeTextStyle", fontFamily: fontFamily) ?? defaultDomainTypography.labelLargeTextStyle,
      inputTextStyle: getDomainTextStyle(name: "inputTextStyle", fontFamily: fontFamily) ?? defaultDomainTypography.inputTextStyle,
      legalTextTextStyle: getDomainTextStyle(name: "legalTextTextStyle", fontFamily: fontFamily) ?? defaultDomainTypography.legalTextTextStyle
    )
  }
  
  private func getDomainTextStyle(name: String, fontFamily: DomainTypography.FontFamily) -> DomainTextStyle?{
    guard let textStyle = self[name] as? NSDictionary else { return nil }
    guard let fontSize = textStyle["fontSize"] as? Int else { return nil }
    let fontWeight = (textStyle["fontWeight"] as? String).toFontWeight()
    return DomainTextStyle(
      fontFamily: fontFamily,
      fontSize: CGFloat(fontSize),
      fontWeight: fontWeight
    )
  }
  
}

private extension Optional where Wrapped == String {
  
  func toThemeMode(default: ThemeMode = .system) -> ThemeMode {
    switch self {
    case "System":
      return .system
    case "Light":
      return .light
    case "Dark":
      return .dark
    default:
      return `default`
    }
  }
  
  func toFontFamily() -> DomainTypography.FontFamily {
    switch self {
    case "Default":
      return DomainTypography.FontFamily.default
    case "SansSerif":
      return DomainTypography.FontFamily.custom(name: "Helvetica")
    case "Serif":
      return DomainTypography.FontFamily.serif
    case "Monospace":
      return DomainTypography.FontFamily.monospace
    case "Cursive":
      return DomainTypography.FontFamily.custom(name: "Snell Roundhand")
    default:
      return DomainTypography.FontFamily.default
    }
  }
  
  func toFontWeight() -> DomainTextStyle.FontWeight{
    switch self {
    case "Thin":
      return DomainTextStyle.FontWeight.thin
    case "ExtraLight":
      return DomainTextStyle.FontWeight.extraLight
    case "Light":
      return DomainTextStyle.FontWeight.light
    case "Normal":
      return DomainTextStyle.FontWeight.normal
    case "Medium":
      return DomainTextStyle.FontWeight.medium
    case "SemiBold":
      return DomainTextStyle.FontWeight.semiBold
    case "Bold":
      return DomainTextStyle.FontWeight.bold
    case "ExtraBold":
      return DomainTextStyle.FontWeight.extraBold
    case "Black":
      return DomainTextStyle.FontWeight.black
    default:
      return DomainTextStyle.FontWeight.normal
    }
  }
}
