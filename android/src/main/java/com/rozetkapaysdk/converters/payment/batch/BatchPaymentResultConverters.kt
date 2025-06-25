package com.rozetkapaysdk.converters.payment.batch

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.rozetkapay.sdk.domain.models.payment.BatchOrderPaymentResult
import com.rozetkapay.sdk.domain.models.payment.BatchPaymentResult
import com.rozetkapaysdk.converters.toReadableArray
import com.rozetkapaysdk.converters.tokenization.toWritableMap


fun BatchPaymentResult.toWritableMap(): WritableMap = when (this) {
  is BatchPaymentResult.Pending -> Arguments.createMap().apply {
    putString("type", "Pending")
    putString("externalId", externalId)
    putArray("ordersPayments", ordersPayments.map { it.toWritableMap() }.toReadableArray())
  }

  is BatchPaymentResult.Complete -> Arguments.createMap().apply {
    putString("type", "Complete")
    putString("externalId", externalId)
    putArray("ordersPayments", ordersPayments.map { it.toWritableMap() }.toReadableArray())
    putMap("tokenizedCard", tokenizedCard?.toWritableMap())
  }

  is BatchPaymentResult.Failed -> Arguments.createMap().apply {
    putString("type", "Failed")
    ordersPayments?.let { ordersPayments ->
      putArray("ordersPayments", ordersPayments.map { it.toWritableMap() }.toReadableArray())
    }
    putString("message", message)
    putString("error", error?.message)
  }

  is BatchPaymentResult.Cancelled -> Arguments.createMap().apply {
    putString("type", "Cancelled")
  }
}

fun BatchOrderPaymentResult.toWritableMap(): WritableMap = Arguments.createMap().apply {
  putString("externalId", externalId)
  putString("operationId", operationId)
}
