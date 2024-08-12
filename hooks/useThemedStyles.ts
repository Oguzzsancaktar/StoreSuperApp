import { useAppTheme } from '@/contexts/ThemeContext';
import { StyleSheet } from 'react-native';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { IButtonStylesheet, IShadowStylesheet } from '@/interfaces/theme';
import { COMMON_COLOURS } from '@/constants/APP_THEMES';


const { HEIGHT_SIZES, RADIUS_SIZES, SPACE_SIZES } = APP_STYLE_VALUES;

const COMMON_BUTTON_STYLES = {
  height: HEIGHT_SIZES.lg,
  borderRadius: RADIUS_SIZES.lg,
  padding: SPACE_SIZES.sp4,
  paddingVertical: SPACE_SIZES.sp0,
  borderWidth: 1,
}



const useThemedStyles = () => {
  const { theme } = useAppTheme();



  const shadowStyles: StyleSheet.NamedStyles<IShadowStylesheet> = StyleSheet.create({
    textShadowSm: {
      shadowColor: COMMON_COLOURS.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    dropShadowSm: {
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 0,
    },
  })

  const buttonStyles: StyleSheet.NamedStyles<IButtonStylesheet> = StyleSheet.create({
    buttonPrimarySolid: {
      ...COMMON_BUTTON_STYLES,
      backgroundColor: theme.primary,
      borderColor: COMMON_COLOURS.primaryDarken10,
      ...shadowStyles.dropShadowSm
    },
    buttonPrimarySolidPressed: {
      ...COMMON_BUTTON_STYLES,
      backgroundColor: theme.primary + "DD",
      borderColor: COMMON_COLOURS.primaryDarken10,
      ...shadowStyles.dropShadowSm
    },
    buttonPrimarySolidDisabled: {
      ...COMMON_BUTTON_STYLES,
      backgroundColor: theme.primary,
      borderColor: COMMON_COLOURS.primaryDarken10,
      opacity: 0.5,
      ...shadowStyles.dropShadowSm
    },


    buttonPrimaryOutlined: {
      ...COMMON_BUTTON_STYLES,
      backgroundColor: theme.appBackground,
      borderColor: theme.primary,
    },
    buttonPrimaryOutlinedPressed: {
      ...COMMON_BUTTON_STYLES,
      backgroundColor: theme.primary + 20,
      borderColor: theme.primary,
    },
    buttonPrimaryOutlinedDisabled: {
      ...COMMON_BUTTON_STYLES,
      backgroundColor: theme.appBackground,
      opacity: 0.5,
      borderColor: theme.primary,
    },
  })

  const containerStyles = StyleSheet.create({
    screenWrapperContainer: {
      flex: 1,
      backgroundColor: theme.appBackground,
    },
  })

  return { buttonStyles, containerStyles, shadowStyles }
};

export default useThemedStyles;
