package com.rozetkapaysdk.converters.theme

import com.facebook.react.bridge.ReadableMap
import com.rozetkapay.sdk.presentation.theme.DomainTypography

internal fun ReadableMap?.toDomainTypography(
  default: DomainTypography
): DomainTypography {
  return DomainTypography(
    fontFamily = this?.getString("fontFamily")?.toDomainTypographyFontFamily() ?: default.fontFamily,
    titleTextStyle = this?.getMap("titleTextStyle").toDomainTextStyle(default.titleTextStyle),
    subtitleTextStyle = this?.getMap("subtitleTextStyle").toDomainTextStyle(default.subtitleTextStyle),
    bodyTextStyle = this?.getMap("bodyTextStyle").toDomainTextStyle(default.bodyTextStyle),
    labelSmallTextStyle = this?.getMap("labelSmallTextStyle").toDomainTextStyle(default.labelSmallTextStyle),
    labelLargeTextStyle = this?.getMap("labelLargeTextStyle").toDomainTextStyle(default.labelLargeTextStyle),
    inputTextStyle = this?.getMap("inputTextStyle").toDomainTextStyle(default.inputTextStyle),
    legalTextTextStyle = this?.getMap("legalTextTextStyle").toDomainTextStyle(default.legalTextTextStyle)
  )
}

private fun String.toDomainTypographyFontFamily(): DomainTypography.FontFamily = when (this) {
  "Default" -> DomainTypography.FontFamily.Default
  "SansSerif" -> DomainTypography.FontFamily.SansSerif
  "Serif" -> DomainTypography.FontFamily.Serif
  "Monospace" -> DomainTypography.FontFamily.Monospace
  "Cursive" -> DomainTypography.FontFamily.Cursive
  else -> DomainTypography.FontFamily.Default
}

