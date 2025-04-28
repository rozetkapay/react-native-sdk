import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import WelcomeCard from './components/WelcomeCard';
import DemoButton from './components/DemoButton';
import RozetkaPaySdk from '@rozetkapay/rozetka-pay-sdk-react-native';
import Credentials from '../../config/Credentials';
import { showAlert } from '../../ui/components/ErrorAlert';
import { FieldRequirement } from '../../../../src/models/FieldRequirement';
import { defaultThemeConfigurator, type ThemeConfigurator } from '../../../../src/models/theme/ThemeConfigurator';
import { defaultTokenizationFieldsParameters } from '../../../../src/models/tokenization/TokenizationParameters';
import { GooglePayConfig } from '../../../../src/models/payment/GooglePayConfig';

const exampleThemeConfiguration: ThemeConfigurator = {
    ...defaultThemeConfigurator,
    lightColorScheme: {
        ...defaultThemeConfigurator.lightColorScheme,
        primary: '#00A046',
    },
    sizes: {
        ...defaultThemeConfigurator.sizes,
        sheetCornerRadius: 32,
    }
}

const handleTokenization = async () => {
    try {
        const result = await RozetkaPaySdk.startTokenization({
            widgetKey: Credentials.widgetKey,
            fieldsParameters: {
                ...defaultTokenizationFieldsParameters,
                cardNameField: FieldRequirement.Optional,
                cardholderNameField: FieldRequirement.Required,
            },
            themeConfigurator: exampleThemeConfiguration
        });

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

const handlePayment = async () => {
    try {
        const result = await RozetkaPaySdk.makePayment({
            token: Credentials.devAuthToken,
            paymentParameters: {
                amountParameters: {
                    amount: 12345,
                    currencyCode: 'UAH',
                },
                orderId: "example_order_id",
                allowTokenization: false,
                googlePayConfig: GooglePayConfig.test(
                    Credentials.googlePayMerchantId,
                    Credentials.googlePayMerchantName
                )
            },
            themeConfigurator: exampleThemeConfiguration
        })

        switch (result.type) {
            case 'Pending':
                console.log('Payment Pending:', result.orderId, result.paymentId);
                showAlert({
                    message: `Payment is pending. Order ID: ${result.orderId}, Payment ID: ${result.paymentId}`,
                    title: 'Payment Pending',
                });
                break;
            case 'Complete':
                console.log('Payment Complete:', result.orderId, result.paymentId);
                showAlert({
                    message: `Payment completed successfully. Order ID: ${result.orderId}, Payment ID: ${result.paymentId}`,
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
}

const MainScreen = () => (
    <View style={styles.container}>
        <ScrollView style={styles.content}>
            <View style={styles.header}>
                <Text variant="titleMedium">Rozetka Pay Demo</Text>
                <Text variant="labelMedium">for React Native</Text>
            </View>
            <WelcomeCard />
            <View style={styles.buttonsContainer}>
                <Text variant="titleMedium" style={{ paddingBottom: 16 }}>Choose an option to try:</Text>
                <DemoButton
                    onPress={handleTokenization}
                    text="Tokenize card"
                />
                <DemoButton
                    onPress={handlePayment}
                    text="Make a payment"
                />
            </View>
        </ScrollView>
    </View>
);

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
        gap: 12
    },
});


export default MainScreen;