package com.rozetkapaysdk.converters.tokenization

import com.facebook.react.bridge.ReadableMap
import com.rozetkapay.sdk.domain.models.tokenization.TokenizationParameters
import com.rozetkapaysdk.converters.toFieldRequirement

fun ReadableMap.toTokenizationParameters(): TokenizationParameters {
  return TokenizationParameters(
    cardNameField = this.getString("cardNameField").toFieldRequirement(),
    emailField = this.getString("emailField").toFieldRequirement(),
    cardholderNameField = this.getString("cardholderNameField").toFieldRequirement()
  )
}
