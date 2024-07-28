import { View, Text } from 'react-native';
import React from 'react';
import useThemedStyles from '@/hooks/useThemedStyles';

interface IProps {
  children: React.ReactNode;
}
const ScreenWrapperContainer: React.FC<IProps> = ({ children }) => {
  const styles = useThemedStyles();

  return <View style={styles.screenWrapperContainer}>{children}</View>;
};

export default ScreenWrapperContainer;
