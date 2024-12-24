import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, router, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { DismissKeyboardWrapper } from "@/components/containers";
import SafeAreaContainer from "@/components/containers/SafeAreaContainer";
import DrawerGlobal from "@/components/drawer/DrawerGlobal";
import ModalGlobal from "@/components/modal/ModalGlobal";
import APP_ROUTES from "@/constants/APP_ROUTES";
import { SessionProvider } from "@/contexts/AuthContext";
import { DrawerProvider } from "@/contexts/DrawerContext";
import { InputFocusProvider } from "@/contexts/InputFocusContext";
import { ListingFilterProvider } from "@/contexts/ListingFilterContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { ThemeProvider, useAppTheme } from "@/contexts/ThemeContext";
import { store } from "@/store/store";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: APP_ROUTES.PUBLIC.UNAUTHORIZED.WELCOME,
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    BRShapeBold: require("../assets/fonts/BR_Shape_Bold.otf"),
    BRShapeSemibold: require("../assets/fonts/BR_Shape_Semibold.otf"),
    BRShapeMedium: require("../assets/fonts/BR_Shape_Medium.otf"),
    BRShapeRegular: require("../assets/fonts/BR_Shape_Regular.otf"),
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
    if (segments?.includes("+not-found" as never)) {
      router.push(APP_ROUTES.PUBLIC.UNAUTHORIZED.WELCOME);
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <InputFocusProvider>
          <DismissKeyboardWrapper>
            <SessionProvider>
              <DrawerProvider>
                <ModalProvider>
                  <ListingFilterProvider>
                    <DrawerGlobal />

                    <ModalGlobal />

                    <Stack
                      screenOptions={{
                        gestureEnabled: true,
                        gestureDirection: "horizontal",
                        animation: "slide_from_right",
                      }}
                    >
                      <Stack.Screen
                        name="(public)"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="(private)"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="(tabs)"
                        options={{
                          headerShown: false,
                        }}
                      />
                    </Stack>
                  </ListingFilterProvider>
                </ModalProvider>
              </DrawerProvider>
            </SessionProvider>
          </DismissKeyboardWrapper>
        </InputFocusProvider>
      </ThemeProvider>
    </Provider>
  );
}
