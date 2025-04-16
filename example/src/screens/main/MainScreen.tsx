import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import WelcomeCard from './components/WelcomeCard';
import DemoButton from './components/DemoButton';
import RozetkaPaySdk from 'react-native-rozetka-pay-sdk';
import Credentials from '../../config/Credentials';
import { showAlert } from '../../ui/components/ErrorAlert';
import type { TokenizationResult } from '../../../../src/models/tokenization/TokenizationResult';
import { FieldRequirement } from '../../../../src/models/FieldRequirement';

const handleTokenization = async () => {
    try {
        const result: TokenizationResult = await RozetkaPaySdk.startTokenization({
            widgetKey: Credentials.widgetKey,
            fieldsParameters: {
                cardNameField: FieldRequirement.Optional,
                emailField: FieldRequirement.None,
                cardholderNameField: FieldRequirement.Required,
            }
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
                showAlert({
                    message: 'Tokenization process was cancelled.',
                    title: 'Tokenization Cancelled',
                });
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
                    onPress={() => console.log('Make a payment pressed')}
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