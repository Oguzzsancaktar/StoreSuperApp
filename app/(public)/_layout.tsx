import { Stack } from 'expo-router';

export default function PublicLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="signin"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
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
