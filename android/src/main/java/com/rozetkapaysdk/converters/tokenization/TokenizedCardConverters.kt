package com.rozetkapaysdk.converters.tokenization

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.rozetkapay.sdk.domain.models.tokenization.TokenizedCard


fun TokenizedCard.toWritableMap(): WritableMap = Arguments.createMap().apply {
  putString("token", token)
  putString("name", name)
  putMap("cardInfo", cardInfo?.toWritableMap())
}

fun TokenizedCard.CardInfo.toWritableMap(): WritableMap = Arguments.createMap().apply {
  putString("maskedNumber", maskedNumber)
  putString("expiresAt", expiresAt)
  putString("paymentSystem", paymentSystem)
  putString("bank", bank)
  putString("isoA3Code", isoA3Code)
  putString("cardType", cardType)
}
