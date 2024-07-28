import APP_THEMES from '@/constants/APP_THEMES';
import { useAppTheme } from '@/contexts/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface IProps {
  children: React.ReactNode;
}
const SafeAreaContainer: React.FC<IProps> = ({ children }) => {
  const { theme } = useAppTheme();

  return (
    <SafeAreaProvider>
      <StatusBar
        animated={true}
        style={
          theme.appBackground === APP_THEMES.light.appBackground
            ? 'dark'
            : 'light'
        }
      />

      <SafeAreaView style={{ flex: 1, backgroundColor: theme.appBackground }}>
        <View style={{ flex: 1 }}>{children}</View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SafeAreaContainer;
