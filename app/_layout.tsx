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
import apiClient from "@/config/axiosInstance";
import "@/config/i18n";
import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STORAGE_KEYS from "@/constants/APP_STORAGE_KEYS";
import { SessionProvider, useAppAuthSession } from "@/contexts/AuthContext";
import { DrawerProvider } from "@/contexts/DrawerContext";
import { InputFocusProvider } from "@/contexts/InputFocusContext";
import { ListingFilterProvider } from "@/contexts/ListingFilterContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { ThemeProvider, useAppTheme } from "@/contexts/ThemeContext";
import { useStorageState } from "@/hooks/useStorageState";
import { accountApiSlice } from "@/services/accountServices";
import { resetApiState } from "@/services/apiTags";
import { baseApi } from "@/services/apiTags";
import { ACCOUNT_API_TAG, LISTING_API_TAG } from "@/services/apiTags";
import { chatApiSlice } from "@/services/chatServices";
import { listingFilterApiSlice } from "@/services/listingFilterServices";
import { listingApiSlice } from "@/services/listingServices";
import { store } from "@/store/store";
import { changeLanguage } from "@/utils/i18nUtils";

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
  const [
    [isPrefferedLanguageLoading, prefferedLanguage],
    setPrefferedLanguage,
  ] = useStorageState(APP_STORAGE_KEYS.PREFFRED_LANGUAGE);

  useEffect(() => {
    if (prefferedLanguage) {
      console.log("prefferedLanguage", prefferedLanguage);
      apiClient.defaults.headers["Accept-Language"] = prefferedLanguage;
      changeLanguage(prefferedLanguage);

      // Complete reset of API state
      store.dispatch(resetApiState());

      // Force refetch all queries
      store.dispatch(accountApiSlice.util.resetApiState());
      store.dispatch(listingApiSlice.util.resetApiState());
      store.dispatch(listingFilterApiSlice.util.resetApiState());
      store.dispatch(chatApiSlice.util.resetApiState());
    }
  }, [prefferedLanguage]);

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
