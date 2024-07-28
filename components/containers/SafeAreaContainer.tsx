import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface IProps {
  children: React.ReactNode;
}
const SafeAreaContainer: React.FC<IProps> = ({ children }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>{children}</View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SafeAreaContainer;
