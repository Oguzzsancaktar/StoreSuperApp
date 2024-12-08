import { View, Text, ScrollView, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import useCommonStyles from '@/hooks/useCommonStyles';

interface IProps {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
}
const ScrollViewStyled: React.FC<IProps> = ({
  children,
  contentContainerStyle,
}) => {
  const commonStyles = useCommonStyles();
  return (
    <ScrollView
      nestedScrollEnabled
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[contentContainerStyle]}
    >
      <View
        onStartShouldSetResponder={() => true} // @todo fix drag problem
        style={[
          commonStyles.flexStyles.colStart,
          {
            width: '100%',
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp4,
          },
        ]}
      >
        {children}
      </View>
    </ScrollView>
  );
};

export default ScrollViewStyled;
