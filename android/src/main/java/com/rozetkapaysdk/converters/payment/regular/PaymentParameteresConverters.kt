package com.rozetkapaysdk.converters.payment.regular

import com.facebook.react.bridge.ReadableMap
import com.rozetkapay.sdk.domain.models.payment.PaymentParameters
import com.rozetkapaysdk.converters.payment.toPaymentTypeConfiguration
import com.rozetkapaysdk.converters.requireMap
import com.rozetkapaysdk.converters.requireString


fun ReadableMap.toPaymentParameters(): PaymentParameters {
  return PaymentParameters(
    amountParameters = requireMap("amountParameters").toAmountParameters(),
    externalId = requireString("externalId"),
    callbackUrl = getString("callbackUrl"),
    paymentType = requireMap("paymentType").toPaymentTypeConfiguration(),
  )
}

fun ReadableMap.toAmountParameters() = PaymentParameters.AmountParameters(
  amount = getDouble("amount").toLong(),
  currencyCode = requireString("currencyCode")
)

