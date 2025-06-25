package com.rozetkapaysdk.converters

import com.facebook.react.bridge.ReadableMap
import com.rozetkapay.sdk.domain.models.CardFieldsParameters

fun ReadableMap.toCardFieldsParameters() = CardFieldsParameters(
    cardNameField = this.getString("cardNameField").toFieldRequirement(),
    emailField = this.getString("emailField").toFieldRequirement(),
    cardholderNameField = this.getString("cardholderNameField").toFieldRequirement()
)
