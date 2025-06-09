package com.rozetkapaysdk.converters.payment

import com.facebook.react.bridge.ReadableMap
import com.rozetkapay.sdk.domain.models.ClientAuthParameters
import com.rozetkapaysdk.converters.requireString


fun ReadableMap.toClientAuthParameters(): ClientAuthParameters {
  return ClientAuthParameters(
    token = this.requireString("token"),
    widgetKey = this.requireString("widgetKey")
  )
}

