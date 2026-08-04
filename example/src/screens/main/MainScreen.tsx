import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text } from 'react-native-paper';
import WelcomeCard from './components/WelcomeCard';
import DemoButton from './components/DemoButton';
import RozetkaPaySdk, {
  defaultCardPaymentFieldsParameters,
  DomainTextStyle,
  DomainTypography,
  PaymentTypeConfiguration,
  ThemeMode,
  isGooglePayAvailable,
} from '@rozetkapay/rozetka-pay-sdk-react-native';
import Credentials from '../../config/Credentials';
import { showAlert } from '../../ui/components/ErrorAlert';
import { FieldRequirement } from '@rozetkapay/rozetka-pay-sdk-react-native';
import {
  defaultThemeConfigurator,
  type ThemeConfigurator,
} from '@rozetkapay/rozetka-pay-sdk-react-native';
import { GooglePayConfig } from '@rozetkapay/rozetka-pay-sdk-react-native';
import { ApplePayConfig } from '../../../../src/models/payment/ApplePayConfig';

const exampleThemeConfiguration: ThemeConfigurator = {
  ...defaultThemeConfigurator,
  mode: ThemeMode.System,
  lightColorScheme: {
    ...defaultThemeConfigurator.lightColorScheme,
    primary: '#FF0000',
  },
  sizes: {
    ...defaultThemeConfigurator.sizes,
    sheetCornerRadius: 32,
    componentCornerRadius: 16,
    buttonHeight: 60,
    googlePayButtonHeight: 50,
    applePayButtonHeight: 40,
    inputHeight: 48,
  },
  typography: {
    ...defaultThemeConfigurator.typography,
    fontFamily: DomainTypography.FontFamily.Default,
    titleTextStyle: {
      ...defaultThemeConfigurator.typography.titleTextStyle,
      fontSize: 24,
      lineHeight: 10,
      fontWeight: DomainTextStyle.FontWeight.Thin,
    },
  },
};

enum DemoPaymentMethod {
  Regular = 'Regular',
  TokenizedCard = 'TokenizedCard',
  GooglePay = 'GooglePay',
}

const buildPaymentType = (
  method: DemoPaymentMethod
): PaymentTypeConfiguration => {
  switch (method) {
    case DemoPaymentMethod.TokenizedCard:
      return PaymentTypeConfiguration.singleTokenPayment(
        Credentials.dev_test_card_token_1
      );
    case DemoPaymentMethod.GooglePay:
      return PaymentTypeConfiguration.googlePayPayment(
        GooglePayConfig.test(
          Credentials.googlePayMerchantId,
          Credentials.googlePayMerchantName
        )
      );
    case DemoPaymentMethod.Regular:
    default:
      return PaymentTypeConfiguration.regularPayment(
        defaultCardPaymentFieldsParameters,
        true,
        GooglePayConfig.test(
          Credentials.googlePayMerchantId,
          Credentials.googlePayMerchantName
        ),
        ApplePayConfig.test(
          Credentials.applePayMerchantId,
          Credentials.applePayMerchantName
        )
      );
  }
};

const handleTokenization = async () => {
  try {
    const result = await RozetkaPaySdk.startTokenization({
      widgetKey: Credentials.devWidgetKey,
      fieldsParameters: {
        ...defaultCardPaymentFieldsParameters,
        cardNameField: FieldRequirement.Optional,
        cardholderNameField: FieldRequirement.Required,
      },
      themeConfigurator: exampleThemeConfiguration,
    });

    console.log('Tokenization result:', result);
    switch (result.type) {
      case 'Complete':
        console.log('Tokenization Complete:', result.tokenizedCard);
        showAlert({
          message: `Tokenization Complete, token = : ${result.tokenizedCard.token}`,
          title: 'Tokenization Success',
        });
        break;
      case 'Failed':
        console.error('Tokenization Failed:', result.message, result.error);
        showAlert({
          message: `Tokenization Failed: ${result.message || 'Unknown error'}`,
          title: 'Tokenization Failed',
        });
        break;
      case 'Cancelled':
        console.log('Tokenization Cancelled');
        break;
      default:
        console.error('Unknown tokenization result:', result);
        showAlert({
          message: 'Unknown tokenization result.',
          title: 'Error',
        });
    }
  } catch (error: any) {
    console.error('Tokenization error:', error);
    showAlert({
      message: error.message || 'An unexpected error occurred.',
      title: 'Tokenization Error',
    });
  }
};

const handlePayment = async (method: DemoPaymentMethod) => {
  try {
    const result = await RozetkaPaySdk.makePayment({
      clientAuthParameters: {
        token: Credentials.devAuthToken,
        widgetKey: Credentials.devWidgetKey,
      },
      paymentParameters: {
        amountParameters: {
          amount: 12345,
          currencyCode: 'UAH',
        },
        externalId: 'example_order_id_' + new Date().getTime(),
        paymentType: buildPaymentType(method),
      },
      themeConfigurator: exampleThemeConfiguration,
    });

    console.log('Payment result:', result);
    switch (result.type) {
      case 'Pending':
        console.log('Payment Pending:', result.externalId, result.paymentId);
        showAlert({
          message: `Payment is pending. External ID: ${result.externalId}, Payment ID: ${result.paymentId}`,
          title: 'Payment Pending',
        });
        break;
      case 'Complete':
        console.log('Payment Complete:', result.externalId, result.paymentId);
        showAlert({
          message: `Payment completed successfully. External ID: ${result.externalId}, Payment ID: ${result.paymentId}`,
          title: 'Payment Success',
        });
        break;
      case 'Failed':
        console.error('Payment Failed:', result.message, result.error);
        showAlert({
          message: `Payment failed: ${result.message || 'Unknown error'}`,
          title: 'Payment Failed',
        });
        break;
      case 'Cancelled':
        console.log('Payment Cancelled');
        break;
      default:
        console.error('Unknown payment result:', result);
        showAlert({
          message: 'Unknown payment result.',
          title: 'Error',
        });
    }
  } catch (error: any) {
    console.error('Payment error:', error);
    showAlert({
      message: error.message || 'An unexpected error occurred.',
      title: 'Payment Error',
    });
  }
};

const handleBatchPayment = async (method: DemoPaymentMethod) => {
  try {
    const result = await RozetkaPaySdk.makeBatchPayment({
      clientAuthParameters: {
        token: Credentials.devAuthToken,
        widgetKey: Credentials.devWidgetKey,
      },
      paymentParameters: {
        currencyCode: 'UAH',
        externalId: 'example_batch_id_' + new Date().getTime(),
        orders: [
          {
            apiKey: Credentials.merchantsApiKeys[0]!!,
            amount: 12345,
            externalId: 'example_order_0_id_' + new Date().getTime(),
            description: 'Order 0 description',
          },
          {
            apiKey: Credentials.merchantsApiKeys[1]!!,
            amount: 10000,
            externalId: 'example_order_1_id_' + new Date().getTime(),
            description: 'Order 1 description',
          },
        ],
        paymentType: buildPaymentType(method),
      },
      themeConfigurator: exampleThemeConfiguration,
    });

    console.log('Payment result:', result);
    switch (result.type) {
      case 'Pending':
        console.log('Batch Payment Pending:', result.externalId);
        showAlert({
          message: `Batch Payment is pending. External ID: ${result.externalId}`,
          title: 'Batch Payment Pending',
        });
        break;
      case 'Complete':
        console.log('Batch Payment Complete:', result.externalId);
        showAlert({
          message: `Batch Payment completed successfully. External ID: ${result.externalId}`,
          title: 'Batch Payment Success',
        });
        break;
      case 'Failed':
        console.error('Batch Payment Failed:', result.message, result.error);
        showAlert({
          message: `Batch Payment failed: ${result.message || 'Unknown error'}`,
          title: 'Batch Payment Failed',
        });
        break;
      case 'Cancelled':
        console.log('Batch Payment Cancelled');
        break;
      default:
        console.error('Unknown batch payment result:', result);
        showAlert({
          message: 'Unknown batch payment result.',
          title: 'Error',
        });
    }
  } catch (error: any) {
    console.error('Batch payment error:', error);
    showAlert({
      message: error.message || 'An unexpected error occurred.',
      title: 'Batch Payment Error',
    });
  }
};

const MainScreen = () => {
  const [googlePayAvailable, setGooglePayAvailable] = useState(false);

  useEffect(() => {
    isGooglePayAvailable(
      GooglePayConfig.test(
        Credentials.googlePayMerchantId,
        Credentials.googlePayMerchantName
      )
    ).then(setGooglePayAvailable);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text variant="titleMedium">Rozetka Pay Demo</Text>
          <Text variant="labelMedium">for React Native</Text>
        </View>
        <WelcomeCard />
        <View style={styles.buttonsContainer}>
          <Text variant="titleMedium" style={{ paddingBottom: 16 }}>
            Tokenization:
          </Text>
          <DemoButton onPress={handleTokenization} text="Tokenize card" />
          <View
            style={{
              height: 24,
            }}
          />
          <Text variant="titleMedium">Payments:</Text>
          <Card mode="contained" style={styles.paymentCard}>
            <Card.Content style={styles.paymentCardContent}>
              <Text variant="titleMedium" style={{ marginBottom: 12 }}>
                Single Payment
              </Text>
              <DemoButton
                onPress={() => handlePayment(DemoPaymentMethod.Regular)}
                text="Pay with Card"
              />
              <DemoButton
                onPress={() => handlePayment(DemoPaymentMethod.TokenizedCard)}
                text="Pay with Token"
              />
              {googlePayAvailable && (
                <DemoButton
                  onPress={() => handlePayment(DemoPaymentMethod.GooglePay)}
                  text="Pay with Google Pay"
                />
              )}
            </Card.Content>
          </Card>
          <Card mode="contained" style={styles.paymentCard}>
            <Card.Content style={styles.paymentCardContent}>
              <Text variant="titleMedium" style={{ marginBottom: 12 }}>
                Batch Payment
              </Text>
              <DemoButton
                onPress={() => handleBatchPayment(DemoPaymentMethod.Regular)}
                text="Pay with Card"
              />
              <DemoButton
                onPress={() =>
                  handleBatchPayment(DemoPaymentMethod.TokenizedCard)
                }
                text="Pay with Token"
              />
              {googlePayAvailable && (
                <DemoButton
                  onPress={() =>
                    handleBatchPayment(DemoPaymentMethod.GooglePay)
                  }
                  text="Pay with Google Pay"
                />
              )}
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
  },
  content: {
    padding: 16,
  },
  buttonsContainer: {
    marginTop: 56,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 12,
  },
  paymentCard: {
    width: '100%',
  },
  paymentCardContent: {
    alignItems: 'center',
    gap: 12,
  },
});

export default MainScreen;
