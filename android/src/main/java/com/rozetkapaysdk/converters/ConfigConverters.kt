package com.rozetkapaysdk.converters

import com.rozetkapay.sdk.init.RozetkaPaySdkMode

fun String.toRozetkaPaySdkMode(): RozetkaPaySdkMode {
  return when (this.lowercase().trim()) {
    "production" -> RozetkaPaySdkMode.Production
    "development" -> RozetkaPaySdkMode.Development
    else -> throw IllegalArgumentException("Unknown RozetkaPaySdk mode: $this")
  }
}
