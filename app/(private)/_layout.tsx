import { useSession } from '@/contexts/AuthContext';
import { Redirect, Stack } from 'expo-router';

export default function PrivateLayout() {
  const { session } = useSession();

  if (!session) {
    return <Redirect href="/login" />;
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
