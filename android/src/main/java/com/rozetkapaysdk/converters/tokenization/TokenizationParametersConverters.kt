package com.rozetkapaysdk.converters.tokenization

import com.facebook.react.bridge.ReadableMap
import com.rozetkapay.sdk.domain.models.tokenization.TokenizationParameters
import com.rozetkapaysdk.converters.toCardFieldsParameters

fun ReadableMap.toTokenizationParameters(): TokenizationParameters {
  return TokenizationParameters(
    cardFieldsParameters = this.toCardFieldsParameters()
  )
}
