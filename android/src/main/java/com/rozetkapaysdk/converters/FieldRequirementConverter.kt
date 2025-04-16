package com.rozetkapaysdk.converters

import com.rozetkapay.sdk.domain.models.FieldRequirement

fun String?.toFieldRequirement(
  defaultValue: FieldRequirement = FieldRequirement.None
): FieldRequirement {
  return when (this?.lowercase()?.trim()) {
    "required" -> FieldRequirement.Required
    "optional" -> FieldRequirement.Optional
    "none" -> FieldRequirement.None
    else -> defaultValue
  }
}
