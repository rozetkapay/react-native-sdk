package com.rozetkapaysdk.converters.payment

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.rozetkapay.sdk.domain.models.payment.PaymentResult

fun PaymentResult.toWritableMap(): WritableMap = when (this) {
  is PaymentResult.Pending -> Arguments.createMap().apply {
    putString("type", "Pending")
    putString("orderId", orderId)
    putString("paymentId", paymentId)
  }

  is PaymentResult.Complete -> Arguments.createMap().apply {
    putString("type", "Complete")
    putString("orderId", orderId)
    putString("paymentId", paymentId)
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
