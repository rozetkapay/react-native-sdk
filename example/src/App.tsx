import { Provider as PaperProvider, Surface } from 'react-native-paper';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import RozetkaPayTheme from './ui/Theme';
import MainScreen from './screens/main/MainScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useEffect } from 'react';
import { showAlert } from './ui/components/ErrorAlert';
import RozetkaPaySdk from '@rozetkapay/rozetka-pay-sdk-react-native';
import { RozetkaPaySdkMode } from '@rozetkapay/rozetka-pay-sdk-react-native';

function initRozetkaPay() {
  RozetkaPaySdk.init({
    mode: RozetkaPaySdkMode.Development,
    enableLogging: true
  }).then(() => {
    console.log('RozetkaPaySdk initialized successfully');
  }).catch(error => {
    console.error('Error initializing RozetkaPaySdk:', error);
    showAlert({
      message: error.message,
      title: 'RozetkaPaySdk initialization error'
    });
  });
}

export default function App() {

  useEffect(() => { initRozetkaPay(); }, []);

  return (
    <PaperProvider
      settings={{
        icon: props => <MaterialIcons {...props} />,
      }}
      theme={RozetkaPayTheme}
    >
      <StatusBar
        backgroundColor={RozetkaPayTheme.colors.background}
        barStyle="dark-content"
      />
      <Surface style={{ height: "100%", backgroundColor: RozetkaPayTheme.colors.background }} elevation={0}>
        <SafeAreaView style={styles.container}>
          <MainScreen />
        </SafeAreaView>
      </Surface>
    </PaperProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
