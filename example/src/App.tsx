import { Provider as PaperProvider, Surface } from 'react-native-paper';
import { StatusBar, StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import RozetkaPayTheme from './ui/Theme';
import MainScreen from './screens/main/MainScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useEffect } from 'react';
import { showAlert } from './ui/components/ErrorAlert';
import RozetkaPaySdk from '@rozetkapay/rozetka-pay-sdk-react-native';
import {
  RozetkaPayApiLanguage,
  RozetkaPaySdkMode,
} from '@rozetkapay/rozetka-pay-sdk-react-native';

function initRozetkaPay() {
  RozetkaPaySdk.init({
    mode: RozetkaPaySdkMode.Development,
    enableLogging: true,
    apiLanguage: RozetkaPayApiLanguage.Ukrainian,
  })
    .then(() => {
      console.log('RozetkaPaySdk initialized successfully');
    })
    .catch((error) => {
      console.error('Error initializing RozetkaPaySdk:', error);
      showAlert({
        message: error.message,
        title: 'RozetkaPaySdk initialization error',
      });
    });
}

function AppContent() {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    initRozetkaPay();
  }, []);

  return (
    <PaperProvider
      settings={{
        icon: (props) => <MaterialIcons {...props} />,
      }}
      theme={RozetkaPayTheme}
    >
      <StatusBar
        backgroundColor={RozetkaPayTheme.colors.background}
        barStyle="dark-content"
      />
      <Surface
        style={{
          height: '100%',
          backgroundColor: RozetkaPayTheme.colors.background,
        }}
        elevation={0}
      >
        <View
          style={[
            styles.container,
            {
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            },
          ]}
        >
          <MainScreen />
        </View>
      </Surface>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
