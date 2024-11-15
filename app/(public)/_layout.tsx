import APP_ROUTES from '@/constants/APP_ROUTES';
import { useSession } from '@/contexts/AuthContext';
import { Redirect, Stack } from 'expo-router';

export default function PublicLayout() {
  const { session } = useSession();

  if (session) {
    return <Redirect href={APP_ROUTES.TABS.TIMELINE} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
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
