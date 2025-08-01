package com.rozetkapaysdk.converters.theme

import com.facebook.react.bridge.NoSuchKeyException
import com.facebook.react.bridge.ReadableMap
import com.rozetkapay.sdk.presentation.theme.DomainSizes
import kotlin.Int

internal fun ReadableMap?.toDomainSizes(
  defaultSizes: DomainSizes
): DomainSizes {
  return DomainSizes(
    sheetCornerRadiusDp = this.getSize("sheetCornerRadius") ?: defaultSizes.sheetCornerRadiusDp,
    componentCornerRadiusDp = this.getSize("componentCornerRadius") ?: defaultSizes.componentCornerRadiusDp,
    buttonCornerRadiusDp = this.getSize("buttonCornerRadius") ?: defaultSizes.buttonCornerRadiusDp,
    borderWidthDp = this.getSize("borderWidth") ?: defaultSizes.borderWidthDp,
    buttonHeightDp = this.getSize("buttonHeight") ?: defaultSizes.buttonHeightDp,
    googlePayButtonHeightDp = this.getSize("googlePayButtonHeight") ?: defaultSizes.googlePayButtonHeightDp,
    inputHeightDp = this.getSize("inputHeight") ?: defaultSizes.inputHeightDp,
    mainButtonTopPaddingDp = this.getSize("mainButtonTopPadding") ?: defaultSizes.mainButtonTopPaddingDp,
  )
}

private fun ReadableMap?.getSize(name: String): Int? {
  return try {
    this?.getInt(name)
  } catch (_: NoSuchKeyException) {
    null
  }
}
