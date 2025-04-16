package com.rozetkapaysdk.converters.payment

import com.facebook.react.bridge.ReadableMap
import com.rozetkapay.sdk.domain.models.payment.PaymentParameters
import com.rozetkapaysdk.converters.requireMap
import com.rozetkapaysdk.converters.requireString


fun ReadableMap.toPaymentParameters(): PaymentParameters {
  return PaymentParameters(
    amountParameters = requireMap("amountParameters").toAmountParameters(),
    orderId = requireString("orderId"),
    callbackUrl = getString("callbackUrl"),
    allowTokenization = getBoolean("allowTokenization"),
    googlePayConfig = getMap("googlePayConfig")?.toGooglePayConfig()
  )
}

fun ReadableMap.toAmountParameters() = PaymentParameters.AmountParameters(
  amount = getDouble("amount").toLong(),
  currencyCode = requireString("currencyCode")
)
