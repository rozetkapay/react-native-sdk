package com.rozetkapaysdk.converters.theme

import com.facebook.react.bridge.ReadableMap
import com.rozetkapay.sdk.presentation.theme.DomainTextStyle

internal fun ReadableMap?.toDomainTextStyle(
  default: DomainTextStyle
): DomainTextStyle {
  return DomainTextStyle(
    fontSizeSp = this?.getInt("fontSize") ?: default.fontSizeSp,
    lineHeightSp = this?.getInt("lineHeight") ?: default.lineHeightSp,
    fontWeight = this?.getString("fontWeight")?.toDomainTextStyleFontWeight() ?: default.fontWeight
  )
}

private fun String.toDomainTextStyleFontWeight(): DomainTextStyle.FontWeight = when (this) {
  "Thin" -> DomainTextStyle.FontWeight.Thin
  "ExtraLight" -> DomainTextStyle.FontWeight.ExtraLight
  "Light" -> DomainTextStyle.FontWeight.Light
  "Normal" -> DomainTextStyle.FontWeight.Normal
  "Medium" -> DomainTextStyle.FontWeight.Medium
  "SemiBold" -> DomainTextStyle.FontWeight.SemiBold
  "Bold" -> DomainTextStyle.FontWeight.Bold
  "ExtraBold" -> DomainTextStyle.FontWeight.ExtraBold
  "Black" -> DomainTextStyle.FontWeight.Black
  else -> DomainTextStyle.FontWeight.Normal
}

