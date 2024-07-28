import React from 'react';
import { Slot, Stack, useRouter } from 'expo-router';

export default function PublicLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          title: 'Login',
        }}
      />
    </Stack>
  );
}
