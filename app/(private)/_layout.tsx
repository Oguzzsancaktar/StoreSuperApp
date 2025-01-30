import { Redirect, Stack } from "expo-router";

import APP_ROUTES from "@/constants/APP_ROUTES";
import { useAppAuthSession } from "@/contexts/AuthContext";

export default function PrivateLayout() {
  const { authToken } = useAppAuthSession();

  if (!authToken) {
    return <Redirect href={APP_ROUTES.PUBLIC.UNAUTHORIZED.WELCOME} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="chat/[chatRegistryId]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings/blockedUsers"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings/updateAccount"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="settings/updatePassword"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings/updateInformations"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings/addressInformations"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings/contactInformations"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings/personalInformations"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
