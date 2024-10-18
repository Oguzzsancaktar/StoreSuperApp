import { View } from 'react-native';
import React from 'react';
import useThemedStyles from '@/hooks/useThemedStyles';
import { ButtonGoBack } from '../button';

interface IProps {
  children: React.ReactNode;
  showGoBack?: boolean;
}
const ScreenWrapperContainer: React.FC<IProps> = ({
  children,
  showGoBack = false,
}) => {
  const themedStyles = useThemedStyles();

  return (
    <View style={themedStyles.containerStyles.screenWrapperContainer}>
      {showGoBack && <ButtonGoBack variant="buttonPrimaryOutlined" />}
      {children}
    </View>
  );
};

export default ScreenWrapperContainer;
