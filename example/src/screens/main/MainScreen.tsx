import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import WelcomeCard from './components/WelcomeCard';
import DemoButton from './components/DemoButton';

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
                    onPress={() => console.log('Tokenize card pressed')}
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