package com.rozetkapaysdk.converters.payment

import com.facebook.react.bridge.ReadableMap
import com.rozetkapay.sdk.domain.models.payment.PaymentTypeConfiguration
import com.rozetkapay.sdk.domain.models.payment.RegularPayment
import com.rozetkapay.sdk.domain.models.payment.SingleTokenPayment
import com.rozetkapaysdk.converters.requireMap
import com.rozetkapaysdk.converters.requireString
import com.rozetkapaysdk.converters.toCardFieldsParameters

fun ReadableMap.toPaymentTypeConfiguration(): PaymentTypeConfiguration {
  return when (requireString("type")) {

    "SingleTokenPayment" -> SingleTokenPayment(
        token = requireString("token")
    )

    "RegularPayment" -> RegularPayment(
        cardFieldsParameters = requireMap("cardFieldsParameters").toCardFieldsParameters(),
        allowTokenization = getBoolean("allowTokenization"),
        googlePayConfig = getMap("googlePayConfig")?.toGooglePayConfig()
    )

    else -> throw IllegalArgumentException("Unknown PaymentTypeConfiguration type")
  }
}
