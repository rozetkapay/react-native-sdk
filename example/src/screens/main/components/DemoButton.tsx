import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface DemoButtonProps {
    onPress: () => void;
    text: string;
}

const DemoButton = ({ onPress, text }: DemoButtonProps) => (
    <Button
        style={styles.button}
        mode="contained"
        onPress={onPress}
    >
        {text}
    </Button>
);

const styles = StyleSheet.create({
    button: {
        minWidth: 240,
    }
});

export default DemoButton;