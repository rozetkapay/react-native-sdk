package com.rozetkapaysdk.converters.theme

import com.rozetkapay.sdk.presentation.theme.ThemeMode

internal fun String?.toThemeMode(
  default: ThemeMode = ThemeMode.System
): ThemeMode = when (this) {
    "System" -> ThemeMode.System
    "Light" -> ThemeMode.Light
    "Dark" -> ThemeMode.Dark
    else -> default
}

