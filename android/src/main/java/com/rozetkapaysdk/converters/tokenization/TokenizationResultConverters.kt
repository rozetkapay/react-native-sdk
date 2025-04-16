package com.rozetkapaysdk.converters.tokenization

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.rozetkapay.sdk.domain.models.tokenization.TokenizationResult


fun TokenizationResult.toWritableMap(): WritableMap = when (this) {
  is TokenizationResult.Complete -> Arguments.createMap().apply {
    putString("type", "Complete")
    putMap("tokenizedCard", tokenizedCard.toWritableMap())
  }

  is TokenizationResult.Failed -> Arguments.createMap().apply {
    putString("type", "Failed")
    putString("message", message)
    putString("error", error?.localizedMessage)
  }

  is TokenizationResult.Cancelled -> Arguments.createMap().apply {
    putString("type", "Cancelled")
  }
}
