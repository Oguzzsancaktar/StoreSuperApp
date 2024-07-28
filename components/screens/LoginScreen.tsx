import React from 'react';
import { router } from 'expo-router';
import { View, Text } from 'react-native';
import { useSession } from '@/contexts/AuthContext';

const LoginScreen = () => {
  const { signIn } = useSession();

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Text>LoginScreensss</Text>
      <Text
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace('/two');
        }}
      >
        Sign In
      </Text>
    </View>
  );
};

export default LoginScreen;
