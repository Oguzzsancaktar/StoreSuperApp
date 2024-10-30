import APP_ROUTES from '@/constants/APP_ROUTES';
import APP_THEMES, { COMMON_COLOURS } from '@/constants/APP_THEMES';
import { useAppTheme } from '@/contexts/ThemeContext';
import { router, usePathname, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface IProps {
  children: React.ReactNode;
}

const SafeAreaContainer: React.FC<IProps> = ({ children }) => {
  const segmenets = useSegments();
  const { theme, useSafeAreaState } = useAppTheme();

  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        animated
        backgroundColor="transparent"
        style={
          theme.appBackground === APP_THEMES.light.appBackground
            ? 'dark'
            : 'light'
        }
      />

      {useSafeAreaState ? (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: theme.appBackground,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor:
                Platform.OS === 'android'
                  ? 'rgba(255, 255, 255, 0.5)'
                  : 'transparent',
            }}
          >
            {children}
          </View>
        </SafeAreaView>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor:
              Platform.OS === 'android'
                ? 'rgba(255, 255, 255, 0.5)'
                : 'transparent',
          }}
        >
          {children}
        </View>
      )}
    </SafeAreaProvider>
  );
};

export default SafeAreaContainer;
