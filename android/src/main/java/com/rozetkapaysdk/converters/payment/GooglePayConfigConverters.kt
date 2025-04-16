package com.rozetkapaysdk.converters.payment

import com.facebook.react.bridge.ReadableMap
import com.rozetkapay.sdk.domain.models.payment.GooglePayConfig
import com.rozetkapaysdk.converters.requireString

fun ReadableMap.toGooglePayConfig(): GooglePayConfig {
  return when (getString("type")) {
    "Test" -> {
      val gateway = getString("gateway")
      val merchantId = requireString("merchantId")
      val merchantName = requireString("merchantName")
      if (gateway == null) {
        return GooglePayConfig.Test(
          merchantId = merchantId,
          merchantName = merchantName
        )
      } else {
        return GooglePayConfig.Test(
          merchantId = merchantId,
          merchantName = merchantName,
          gateway = gateway
        )
      }
    }

    "Production" -> GooglePayConfig.Production(
      merchantId = requireString("merchantId"),
      merchantName = requireString("merchantName")
    )

    else -> throw IllegalArgumentException("Unknown GooglePayConfig type")
  }
}
