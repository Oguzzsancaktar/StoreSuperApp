import { Stack } from "expo-router";

export default function PublicLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(unauthorized)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(drawer)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
