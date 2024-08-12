import { View, Text } from 'react-native';
import React from 'react';
import useThemedStyles from '@/hooks/useThemedStyles';

interface IProps {
  children: React.ReactNode;
}
const ScreenWrapperContainer: React.FC<IProps> = ({ children }) => {
  const themedStyles = useThemedStyles();

  return (
    <View style={themedStyles.containerStyles.screenWrapperContainer}>
      {children}
    </View>
  );
};

export default ScreenWrapperContainer;
