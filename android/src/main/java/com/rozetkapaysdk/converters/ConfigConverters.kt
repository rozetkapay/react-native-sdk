package com.rozetkapaysdk.converters

import com.rozetkapay.sdk.init.RozetkaPayLanguage
import com.rozetkapay.sdk.init.RozetkaPaySdkMode

fun String.toRozetkaPaySdkMode(): RozetkaPaySdkMode {
  return when (this.lowercase().trim()) {
    "production" -> RozetkaPaySdkMode.Production
    "development" -> RozetkaPaySdkMode.Development
    else -> throw IllegalArgumentException("Unknown RozetkaPaySdk mode: $this")
  }
}

fun String?.toRozetkaPayLanguage(): RozetkaPayLanguage {
  return when (this?.lowercase()?.trim()) {
    "ukrainian" -> RozetkaPayLanguage.Ukrainian
    "english" -> RozetkaPayLanguage.English
    else -> RozetkaPayLanguage.System
  }
}
