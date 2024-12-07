import { Stack } from 'expo-router';

export default function PublicLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="chat/[chatRegistryId]"
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
