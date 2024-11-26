import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { BlurView } from '@react-native-community/blur';
import useCommonStyles from '@/hooks/useCommonStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import FilterListingOptionsByCategory from '../form/FormListingFilter';
import { useAppTheme } from '@/contexts/ThemeContext';
import { useDrawerState } from '@/contexts/DrawerContext';
import ImageIconCircle from '../images/ImageIconCircle';
import IconClose from '../svg/icon/IconClose';

const DrawerGlobal = () => {
  const commonStyles = useCommonStyles();
  const { theme, isDark } = useAppTheme();

  const { isDrawerOpen, toggleDrawer } = useDrawerState();

  if (!isDrawerOpen) {
    return null;
  }
  return (
    <View
      style={[commonStyles.absolutePositionStyles.absoluteFill, { zIndex: 9 }]}
    >
      <BlurView
        style={commonStyles.absolutePositionStyles.absoluteFill}
        blurType={isDark ? 'ultraThinMaterialDark' : 'xlight'}
        blurAmount={2}
      />

      <View
        style={{
          flex: 1,
          backgroundColor: theme.appBackground,
          padding: APP_STYLE_VALUES.SPACE_SIZES.sp4,
          marginLeft: APP_STYLE_VALUES.SPACE_SIZES.sp8,
          gap: APP_STYLE_VALUES.SPACE_SIZES.sp4,
        }}
      >
        <ImageIconCircle
          onPress={toggleDrawer}
          gradientBg={true}
          radius={APP_STYLE_VALUES.RADIUS_SIZES.sm}
          borderColor="primary"
          bgColor="appBackground"
          size={APP_STYLE_VALUES.WH_SIZES.xs}
          icon={<IconClose color={theme.grayScale900} />}
        />

        <View style={{ flex: 1 }}>
          <FilterListingOptionsByCategory />
        </View>
      </View>
    </View>
  );
};

export default DrawerGlobal;
