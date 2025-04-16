package com.rozetkapaysdk.converters.theme

import com.facebook.react.bridge.ReadableMap
import com.rozetkapay.sdk.presentation.theme.DomainSizes

internal fun ReadableMap?.toDomainSizes(
  defaultSizes: DomainSizes
): DomainSizes {
  return DomainSizes(
    sheetCornerRadiusDp = this.getSize("sheetCornerRadius") ?: defaultSizes.sheetCornerRadiusDp,
    componentCornerRadiusDp = this.getSize("componentCornerRadius") ?: defaultSizes.componentCornerRadiusDp,
    buttonCornerRadiusDp = this.getSize("buttonCornerRadius") ?: defaultSizes.buttonCornerRadiusDp,
    borderWidthDp = this.getSize("borderWidth") ?: defaultSizes.borderWidthDp
  )
}

private fun ReadableMap?.getSize(name: String): Int? {
  return this?.getInt(name)
}
