package com.rozetkapaysdk.converters.payment.regular

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.rozetkapay.sdk.domain.models.payment.PaymentResult
import com.rozetkapaysdk.converters.tokenization.toWritableMap

fun PaymentResult.toWritableMap(): WritableMap = when (this) {
  is PaymentResult.Pending -> Arguments.createMap().apply {
    putString("type", "Pending")
    putString("externalId", externalId)
    putString("paymentId", paymentId)
  }

  is PaymentResult.Complete -> Arguments.createMap().apply {
    putString("type", "Complete")
    putString("externalId", externalId)
    putString("paymentId", paymentId)
    putMap("tokenizedCard", tokenizedCard?.toWritableMap())
  }

  is PaymentResult.Failed -> Arguments.createMap().apply {
    putString("type", "Failed")
    putString("paymentId", paymentId)
    putString("message", message)
    putString("error", error?.message)
  }

  is PaymentResult.Cancelled -> Arguments.createMap().apply {
    putString("type", "Cancelled")
  }
}
