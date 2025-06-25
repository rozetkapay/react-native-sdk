package com.rozetkapaysdk.converters

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableNativeArray

fun ReadableMap.requireString(name: String): String {
  return getString(name) ?: throw IllegalArgumentException("$name is required")
}

fun ReadableMap.requireMap(name: String): ReadableMap {
  return getMap(name) ?: throw IllegalArgumentException("$name is required")
}

fun ReadableArray.requireMap(index: Int): ReadableMap {
  return getMap(index) ?: throw IllegalArgumentException("[$index] is required")
}

fun ReadableMap.requireArray(name: String): ReadableArray {
  return getArray(name) ?: throw IllegalArgumentException("$name is required")
}

fun <T> List<T>.toReadableArray(): ReadableArray {
  return WritableNativeArray().apply {
    for (item in this@toReadableArray) {
      when (item) {
        is String -> pushString(item)
        is Int -> pushInt(item)
        is Double -> pushDouble(item)
        is Boolean -> pushBoolean(item)
        is ReadableMap -> pushMap(item)
        is ReadableArray -> pushArray(item)
        else -> throw IllegalArgumentException("Unsupported type")
      }
    }
  }
}
