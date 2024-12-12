import React from 'react';
import APP_THEMES from '@/constants/APP_THEMES';
import { useAppTheme } from '@/contexts/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { View, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { concat } from 'lodash';

interface IProps {
  children: React.ReactNode;
  isTopEdgeActive?: boolean;
}

const SafeAreaContainer: React.FC<IProps> = ({ children, isTopEdgeActive }) => {
  const { theme, isDark } = useAppTheme();

  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        animated
        backgroundColor="transparent"
        style={isDark ? 'light' : 'dark'}
      />

      <SafeAreaView
        edges={concat(
          ['bottom', 'left', 'right'],
          isTopEdgeActive ? ['top'] : []
        )}
        style={{
          flex: 1,
          backgroundColor: theme.appBackground,
          paddingTop: 0,
          marginTop: 0,
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
    </SafeAreaProvider>
  );
};

export default SafeAreaContainer;
