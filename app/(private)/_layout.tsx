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
        name="chat/[chatRegistryId]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
