import { DismissKeyboardWrapper } from '@/components/containers';
import SafeAreaContainer from '@/components/containers/SafeAreaContainer';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import APP_TYPOGRAPHY from '@/constants/APP_TYPOGRAPHY';
import { SessionProvider } from '@/contexts/AuthContext';
import { InputFocusProvider } from '@/contexts/InputFocusContext';
import { ThemeProvider, useAppTheme } from '@/contexts/ThemeContext';
import { store } from '@/store/store';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { router, Slot, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import ToastManager from 'toastify-react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/(public)/welcome',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    BRShapeBold: require('../assets/fonts/BR_Shape_Bold.otf'),
    BRShapeSemibold: require('../assets/fonts/BR_Shape_Semibold.otf'),
    BRShapeMedium: require('../assets/fonts/BR_Shape_Medium.otf'),
    BRShapeRegular: require('../assets/fonts/BR_Shape_Regular.otf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const segments = useSegments();

  useEffect(() => {
    if (segments?.includes('+not-found' as never)) {
      router.push('/(public)/welcome');
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <InputFocusProvider>
          <DismissKeyboardWrapper>
            <SessionProvider>
              <SafeAreaContainer>
                <Slot />
              </SafeAreaContainer>
            </SessionProvider>
          </DismissKeyboardWrapper>
        </InputFocusProvider>
      </ThemeProvider>
    </Provider>
  );
}
