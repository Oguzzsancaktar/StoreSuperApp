import { Stack } from 'expo-router';

export default function PublicLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="post/[listingId]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="settings/index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="settings/privacyPolicy"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="success"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="favorites"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
