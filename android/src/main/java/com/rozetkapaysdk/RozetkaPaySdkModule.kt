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
import com.rozetkapay.sdk.domain.models.payment.BatchPaymentResult
import com.rozetkapay.sdk.domain.models.payment.PaymentResult
import com.rozetkapay.sdk.domain.models.tokenization.TokenizationResult
import com.rozetkapay.sdk.presentation.payment.batch.BatchPaymentSheetContract
import com.rozetkapay.sdk.presentation.payment.regular.PaymentSheetContract
import com.rozetkapay.sdk.presentation.tokenization.TokenizationSheetContract
import com.rozetkapaysdk.converters.payment.batch.toBatchPaymentParameters
import com.rozetkapaysdk.converters.payment.batch.toWritableMap
import com.rozetkapaysdk.converters.payment.regular.toPaymentParameters
import com.rozetkapaysdk.converters.payment.regular.toWritableMap
import com.rozetkapaysdk.converters.payment.toClientAuthParameters
import com.rozetkapaysdk.converters.theme.toRozetkaPayThemeConfigurator
import com.rozetkapaysdk.converters.toRozetkaPaySdkMode
import com.rozetkapaysdk.converters.tokenization.toTokenizationParameters
import com.rozetkapaysdk.converters.tokenization.toWritableMap


class RozetkaPaySdkModule(
  private val appContext: ReactApplicationContext
) : ReactContextBaseJavaModule(appContext), ActivityEventListener {

  private val tokenizationContract = TokenizationSheetContract()
  private var tokenizationCallback: ((TokenizationResult) -> Unit)? = null

  private val paymentContract = PaymentSheetContract()
  private var paymentCallback: ((PaymentResult) -> Unit)? = null

  private val batchPaymentContract = BatchPaymentSheetContract()
  private var batchPaymentCallback: ((BatchPaymentResult) -> Unit)? = null

  override fun initialize() {
    super.initialize()
    appContext.addActivityEventListener(this)
  }

  override fun onActivityResult(p0: Activity, requestCode: Int, resultCode: Int, data: Intent?) {
    when (requestCode) {
      TOKENIZATION_REQUEST_CODE -> {
        val result: TokenizationResult = tokenizationContract.parseResult(resultCode, data)
        tokenizationCallback?.invoke(result)
        tokenizationCallback = null
      }

      PAYMENT_REQUEST_CODE -> {
        val result: PaymentResult = paymentContract.parseResult(resultCode, data)
        paymentCallback?.invoke(result)
        paymentCallback = null
      }

      BATCH_PAYMENT_REQUEST_CODE -> {
        val result: BatchPaymentResult = batchPaymentContract.parseResult(resultCode, data)
        batchPaymentCallback?.invoke(result)
        batchPaymentCallback = null
      }
    }
  }

  override fun onNewIntent(p0: Intent) {
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
    val activity = requireCurrentActivity()
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

  @ReactMethod
  fun makePayment(
    clientAuthParameters: ReadableMap,
    paymentParameters: ReadableMap,
    themeConfigurator: ReadableMap,
    promise: Promise
  ) = protectedMethod(
    promise = promise,
    onError = {
      paymentCallback = null
    }) {
    paymentCallback = {
      promise.resolve(it.toWritableMap())
    }
    val activity = requireCurrentActivity()
    val intent = paymentContract.createIntent(
      context = activity,
      input = PaymentSheetContract.Parameters(
        clientAuthParameters = clientAuthParameters.toClientAuthParameters(),
        parameters = paymentParameters.toPaymentParameters(),
        themeConfigurator = themeConfigurator.toRozetkaPayThemeConfigurator()
      )
    )
    activity.startActivityForResult(intent, PAYMENT_REQUEST_CODE)
  }

  @ReactMethod
  fun makeBatchPayment(
    clientAuthParameters: ReadableMap,
    paymentParameters: ReadableMap,
    themeConfigurator: ReadableMap,
    promise: Promise
  ) = protectedMethod(
    promise = promise,
    onError = {
      batchPaymentCallback = null
    }) {
    batchPaymentCallback = {
      promise.resolve(it.toWritableMap())
    }
    val activity = requireCurrentActivity()
    val intent = batchPaymentContract.createIntent(
      context = activity,
      input = BatchPaymentSheetContract.Parameters(
        clientAuthParameters = clientAuthParameters.toClientAuthParameters(),
        parameters = paymentParameters.toBatchPaymentParameters(),
        themeConfigurator = themeConfigurator.toRozetkaPayThemeConfigurator()
      )
    )
    activity.startActivityForResult(intent, BATCH_PAYMENT_REQUEST_CODE)
  }

  private fun requireCurrentActivity(): Activity {
    return currentActivity ?: throw IllegalStateException("Current activity is null")
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
    private const val PAYMENT_REQUEST_CODE = 1002
    private const val BATCH_PAYMENT_REQUEST_CODE = 1003
  }
}
