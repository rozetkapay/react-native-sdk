package com.rozetkapaysdk.converters.theme

import com.facebook.react.bridge.ReadableMap
import com.rozetkapay.sdk.presentation.theme.RozetkaPayDomainThemeDefaults
import com.rozetkapay.sdk.presentation.theme.RozetkaPayThemeConfigurator

fun ReadableMap.toRozetkaPayThemeConfigurator(): RozetkaPayThemeConfigurator {
  val defaultLightColorScheme = RozetkaPayDomainThemeDefaults.lightColors()
  val defaultDarkColorScheme = RozetkaPayDomainThemeDefaults.darkColors()
  val defaultSizes = RozetkaPayDomainThemeDefaults.sizes()
  return RozetkaPayThemeConfigurator(
    lightColorScheme = this.getMap("lightColorScheme")?.toDomainColorScheme(
      defaultColorScheme = defaultLightColorScheme
    ) ?: defaultLightColorScheme,
    darkColorScheme = this.getMap("darkColorScheme")?.toDomainColorScheme(
      defaultColorScheme = defaultDarkColorScheme
    ) ?: defaultDarkColorScheme,
    sizes = this.getMap("sizes")?.toDomainSizes(
      defaultSizes = defaultSizes
    ) ?: defaultSizes
  )
}

