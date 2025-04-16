import { Alert } from 'react-native';

interface AlertParams {
  message: string;
  title?: string;
}

export function showAlert({ message, title = "Error" }: AlertParams) {
  Alert.alert(
    title,
    message,
    [
      {
        text: "OK",
        onPress: () => {},
      },
    ],
    { cancelable: true }
  );
}