import { Card, Text, Icon } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const WelcomeCard = () => (
    <Card mode='contained'>
        <Card.Content>
                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <Icon
                            source="info-outline"
                            size={24}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text variant="titleMedium" style={{marginBottom: 4}}>Welcome to Rozetka Pay Demo</Text>
                        <Text variant="bodyMedium">This is a demo applciation for Rozetka Pay SDK integration. You can try different features of the SDK here.</Text>
                    </View>
                </View>
        </Card.Content>
    </Card>
);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconContainer: {
        flexShrink: 0,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
});

export default WelcomeCard;