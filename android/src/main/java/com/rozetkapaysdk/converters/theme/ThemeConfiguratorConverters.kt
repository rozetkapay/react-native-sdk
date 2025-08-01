package com.rozetkapaysdk.converters.theme

import com.facebook.react.bridge.ReadableMap
import com.rozetkapay.sdk.presentation.theme.RozetkaPayDomainThemeDefaults
import com.rozetkapay.sdk.presentation.theme.RozetkaPayThemeConfigurator
import com.rozetkapay.sdk.presentation.theme.ThemeMode

fun ReadableMap.toRozetkaPayThemeConfigurator(): RozetkaPayThemeConfigurator {
  val defaultLightColorScheme = RozetkaPayDomainThemeDefaults.lightColors()
  val defaultDarkColorScheme = RozetkaPayDomainThemeDefaults.darkColors()
  val defaultSizes = RozetkaPayDomainThemeDefaults.sizes()
  val defaultTypography = RozetkaPayDomainThemeDefaults.typography()

  return RozetkaPayThemeConfigurator(
    mode = this.getString("mode").toThemeMode(default = ThemeMode.System),
    lightColorScheme = this.getMap("lightColorScheme")?.toDomainColorScheme(
      defaultColorScheme = defaultLightColorScheme
    ) ?: defaultLightColorScheme,
    darkColorScheme = this.getMap("darkColorScheme")?.toDomainColorScheme(
      defaultColorScheme = defaultDarkColorScheme
    ) ?: defaultDarkColorScheme,
    sizes = this.getMap("sizes")?.toDomainSizes(
      defaultSizes = defaultSizes
    ) ?: defaultSizes,
    typography = this.getMap("typography")?.toDomainTypography(
      default = defaultTypography
    ) ?: defaultTypography
  )
}
