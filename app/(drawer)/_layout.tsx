import { Stack } from 'expo-router';

export default function PublicLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="settings"
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
