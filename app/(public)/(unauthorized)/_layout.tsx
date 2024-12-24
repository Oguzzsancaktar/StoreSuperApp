import { Redirect, Stack } from "expo-router";

import APP_ROUTES from "@/constants/APP_ROUTES";
import { useAppAuthSession } from "@/contexts/AuthContext";

export default function PublicLayout() {
  const { authToken } = useAppAuthSession();

  if (authToken) {
    return <Redirect href={APP_ROUTES.TABS.TIMELINE} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="welcome"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
