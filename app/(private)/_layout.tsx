import { Stack } from 'expo-router';

export default function PublicLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="post/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
