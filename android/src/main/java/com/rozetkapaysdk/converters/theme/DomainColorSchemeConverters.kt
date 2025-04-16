package com.rozetkapaysdk.converters.theme

import android.util.Log
import androidx.compose.ui.graphics.Color
import com.facebook.react.bridge.ReadableMap
import com.rozetkapay.sdk.presentation.theme.DomainColorScheme

fun ReadableMap.toDomainColorScheme(
  defaultColorScheme: DomainColorScheme
): DomainColorScheme {
  return DomainColorScheme(
    surface = this.getColor("surface") ?: defaultColorScheme.surface,
    onSurface = this.getColor("onSurface") ?: defaultColorScheme.onSurface,
    appBarIcon = this.getColor("appBarIcon") ?: defaultColorScheme.appBarIcon,
    title = this.getColor("title") ?: defaultColorScheme.title,
    subtitle = this.getColor("subtitle") ?: defaultColorScheme.subtitle,
    error = this.getColor("error") ?: defaultColorScheme.error,
    primary = this.getColor("primary") ?: defaultColorScheme.primary,
    onPrimary = this.getColor("onPrimary") ?: defaultColorScheme.onPrimary,
    placeholder = this.getColor("placeholder") ?: defaultColorScheme.placeholder,
    componentSurface = this.getColor("componentSurface") ?: defaultColorScheme.componentSurface,
    componentDivider = this.getColor("componentDivider") ?: defaultColorScheme.componentDivider,
    onComponent = this.getColor("onComponent") ?: defaultColorScheme.onComponent,
  )
}

private fun ReadableMap?.getColor(name: String): Color? {
  val hex = this?.getString(name)
  return if (hex != null) {
    try {
      hexToColor(hex)
    } catch (e: Exception) {
      Log.e("RozetkaPaySdk", "Invalid color format for $name: $hex", e)
      null
    }
  } else {
    null
  }
}

private fun hexToColor(hex: String): Color {
  val cleanedHex = hex.trim().removePrefix("#")
  return when (cleanedHex.length) {
    6 -> {
      // Format: RRGGBB
      val r = cleanedHex.substring(0, 2).toInt(16)
      val g = cleanedHex.substring(2, 4).toInt(16)
      val b = cleanedHex.substring(4, 6).toInt(16)
      Color(r, g, b)
    }

    8 -> {
      // Format: AARRGGBB
      val a = cleanedHex.substring(0, 2).toInt(16)
      val r = cleanedHex.substring(2, 4).toInt(16)
      val g = cleanedHex.substring(4, 6).toInt(16)
      val b = cleanedHex.substring(6, 8).toInt(16)
      Color(r, g, b, a)
    }

    else -> throw IllegalArgumentException("Invalid hex color format: $hex")
  }
}
