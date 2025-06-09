package com.rozetkapaysdk.converters.payment.batch

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.rozetkapay.sdk.domain.models.payment.BatchPaymentParameters
import com.rozetkapaysdk.converters.payment.toPaymentTypeConfiguration
import com.rozetkapaysdk.converters.requireArray
import com.rozetkapaysdk.converters.requireMap
import com.rozetkapaysdk.converters.requireString


fun ReadableMap.toBatchPaymentParameters(): BatchPaymentParameters {
  return BatchPaymentParameters(
    currencyCode = requireString("currencyCode"),
    externalId = requireString("externalId"),
    callbackUrl = getString("callbackUrl"),
    paymentType = requireMap("paymentType").toPaymentTypeConfiguration(),
    orders = requireArray("orders").toBatchPaymentParametersOrders()
  )
}

fun ReadableArray.toBatchPaymentParametersOrders(): List<BatchPaymentParameters.Order> {
  val orders = mutableListOf<BatchPaymentParameters.Order>()
  for (i in 0 until this.size()) {
    val orderMap = this.requireMap(i)
    orders.add(
      BatchPaymentParameters.Order(
        apiKey = orderMap.requireString("apiKey"),
        amount = orderMap.getDouble("amount").toLong(),
        externalId = orderMap.requireString("externalId"),
        description = orderMap.requireString("description")
      )
    )
  }
  return orders
}
