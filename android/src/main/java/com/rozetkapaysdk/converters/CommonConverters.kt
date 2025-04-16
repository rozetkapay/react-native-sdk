package com.rozetkapaysdk.converters

import com.facebook.react.bridge.ReadableMap

fun ReadableMap.requireString(name: String): String {
  return getString(name) ?: throw IllegalArgumentException("$name is required")
}

fun ReadableMap.requireMap(name: String): ReadableMap {
  return getMap(name) ?: throw IllegalArgumentException("$name is required")
}
