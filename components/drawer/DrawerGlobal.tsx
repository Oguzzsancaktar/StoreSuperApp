import { useWindowDimensions, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import useCommonStyles from '@/hooks/useCommonStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import FormListingFilter from '../form/FormListingFilter';
import { useAppTheme } from '@/contexts/ThemeContext';
import { useDrawerState } from '@/contexts/DrawerContext';
import ImageIconCircle from '../images/ImageIconCircle';
import IconClose from '../svg/icon/IconClose';

const DrawerGlobal = () => {
  const commonStyles = useCommonStyles();
  const { theme, isDark } = useAppTheme();

  const { isDrawerOpen, toggleDrawer } = useDrawerState();
  const { height } = useWindowDimensions();

  if (!isDrawerOpen) {
    return null;
  }
  return (
    <View
      style={[
        commonStyles.absolutePositionStyles.absoluteFill,
        {
          height: height - APP_STYLE_VALUES.WH_SIZES.xl2,
          position: 'absolute',
          zIndex: 9,
        },
      ]}
    >
      <BlurView
        style={commonStyles.absolutePositionStyles.absoluteFill}
        blurType={isDark ? 'ultraThinMaterialDark' : 'xlight'}
        blurAmount={2}
      />

      <View
        style={{
          height: '100%',
          flex: 1,
          backgroundColor: theme.appBackground,
          marginRight: APP_STYLE_VALUES.SPACE_SIZES.sp8,
          gap: APP_STYLE_VALUES.SPACE_SIZES.sp4,
        }}
      >
        <View style={{ marginLeft: APP_STYLE_VALUES.SPACE_SIZES.sp4 }}>
          <ImageIconCircle
            onPress={toggleDrawer}
            gradientBg={true}
            radius={APP_STYLE_VALUES.RADIUS_SIZES.sm}
            borderColor="primary"
            bgColor="appBackground"
            size={APP_STYLE_VALUES.WH_SIZES.xs}
            icon={<IconClose color={theme.grayScale900} />}
          />
        </View>

        <View style={{ flex: 1, height: '100%' }}>
          <FormListingFilter />
        </View>
      </View>
    </View>
  );
};

export default DrawerGlobal;
