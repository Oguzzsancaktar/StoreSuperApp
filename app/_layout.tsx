import SafeAreaContainer from '@/components/containers/SafeAreaContainer';
import { SessionProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

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
  return (
    <ThemeProvider>
      <SessionProvider>
        <SafeAreaContainer>
          <Slot initialRouteName="/(public)" />
        </SafeAreaContainer>
      </SessionProvider>
    </ThemeProvider>
  );
}
