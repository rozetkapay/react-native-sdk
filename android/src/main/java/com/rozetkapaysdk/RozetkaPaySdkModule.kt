package com.rozetkapaysdk

import android.app.Activity
import android.content.Intent
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.rozetkapay.sdk.RozetkaPaySdk
import com.rozetkapay.sdk.domain.models.ClientWidgetParameters
import com.rozetkapay.sdk.domain.models.tokenization.TokenizationResult
import com.rozetkapay.sdk.presentation.tokenization.TokenizationSheetContract
import com.rozetkapaysdk.converters.theme.toRozetkaPayThemeConfigurator
import com.rozetkapaysdk.converters.toRozetkaPaySdkMode
import com.rozetkapaysdk.converters.tokenization.toTokenizationParameters
import com.rozetkapaysdk.converters.tokenization.toWritableMap


class RozetkaPaySdkModule(
  private val appContext: ReactApplicationContext
) : ReactContextBaseJavaModule(appContext), ActivityEventListener {

  private val tokenizationContract = TokenizationSheetContract()
  private var tokenizationCallback: ((TokenizationResult) -> Unit)? = null

  override fun initialize() {
    super.initialize()
    appContext.addActivityEventListener(this)
  }

  override fun onActivityResult(p0: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {
    if (requestCode == TOKENIZATION_REQUEST_CODE) {
      val result: TokenizationResult = tokenizationContract.parseResult(resultCode, data)
      tokenizationCallback?.invoke(result)
      tokenizationCallback = null
    }
  }

  override fun onNewIntent(p0: Intent?) {
    // No-op
  }

  @ReactMethod
  fun init(
    mode: String,
    enableLogging: Boolean,
    promise: Promise
  ) = protectedMethod(promise) {
    RozetkaPaySdk.init(
      appContext = appContext,
      mode = mode.toRozetkaPaySdkMode(),
      enableLogging = enableLogging,
    )
    promise.resolve(true)
  }

  @ReactMethod
  fun startTokenization(
    widgetKey: String,
    fieldsParameters: ReadableMap,
    themeConfigurator: ReadableMap,
    promise: Promise
  ) = protectedMethod(
    promise = promise,
    onError = {
      tokenizationCallback = null
    }) {
    tokenizationCallback = {
      promise.resolve(it.toWritableMap())
    }
    val activity = currentActivity!!
    val intent = tokenizationContract.createIntent(
      context = activity,
      input = TokenizationSheetContract.Parameters(
        client = ClientWidgetParameters(
          widgetKey = widgetKey,
        ),
        parameters = fieldsParameters.toTokenizationParameters(),
        themeConfigurator = themeConfigurator.toRozetkaPayThemeConfigurator()
      )
    )
    activity.startActivityForResult(intent, TOKENIZATION_REQUEST_CODE)
  }

  private inline fun protectedMethod(
    promise: Promise,
    noinline onError: ((Exception) -> Unit)? = null,
    block: () -> Unit
  ) {
    try {
      block()
    } catch (e: Exception) {
      onError?.invoke(e)
      promise.reject(e)
    }
  }

  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "RozetkaPaySdk"

    private const val TOKENIZATION_REQUEST_CODE = 1001
  }
}
