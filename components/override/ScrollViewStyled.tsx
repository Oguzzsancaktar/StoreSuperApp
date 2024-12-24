import React from "react";
import { ScrollView, StyleProp, Text, View, ViewStyle } from "react-native";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";

interface IProps {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
}
const ScrollViewStyled: React.FC<IProps> = ({
  children,
  contentContainerStyle,
}) => {
  const { commonStyles } = useAppStyles();
  return (
    <ScrollView
      nestedScrollEnabled
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[contentContainerStyle]}
    >
      <View
        onStartShouldSetResponder={() => true}
        style={[
          commonStyles.flexStyles.colStart,
          {
            width: "100%",
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
