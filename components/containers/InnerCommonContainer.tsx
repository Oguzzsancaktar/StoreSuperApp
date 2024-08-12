import React from 'react';
import { View } from 'react-native';
import useThemedStyles from '@/hooks/useThemedStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import useCommonStyles from '@/hooks/useCommonStyles';

const { HEIGHT_SIZES, RADIUS_SIZES, MAX_WIDTH, SPACE_SIZES } = APP_STYLE_VALUES;

interface IProps {
  children: React.ReactNode;
}

const InnerCommonContainer: React.FC<IProps> = ({ children }) => {
  const commonStyles = useCommonStyles();

  return (
    <View
      style={[
        commonStyles.maxWidthStyles.maxWidthXl,
        commonStyles.flexStyles.selfCenter,
        commonStyles.flexStyles.colBetween,
        commonStyles.spacingStyles.p4,
        {
          flex: 1,
          width: '100%',
          paddingVertical: SPACE_SIZES.sp20,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default InnerCommonContainer;
