import { useAppTheme } from '@/contexts/ThemeContext';
import { DimensionValue, StyleSheet } from 'react-native';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { IBorderStylesheet, IButtonStylesheet, ICardStylesheet, IShadowStylesheet } from '@/interfaces/theme';
import { COMMON_COLOURS } from '@/constants/APP_THEMES';


const { WH_SIZES, RADIUS_SIZES, SPACE_SIZES } = APP_STYLE_VALUES;

const COMMON_BUTTON_STYLES = {
  width: "auto" as any,
  height: WH_SIZES.lg,
  borderRadius: RADIUS_SIZES.lg,
  padding: SPACE_SIZES.sp4,
  paddingVertical: SPACE_SIZES.sp0,
  borderWidth: 1,
}

const COMMON_CARD_STYLES = {
  borderRadius: RADIUS_SIZES.lg,
  padding: SPACE_SIZES.sp4,
  borderWidth: 1,
  overflow: "hidden" as "hidden" | "visible" | undefined,
  position: "relative" as "relative" | "absolute" | "static" | undefined,
  width: "100%" as DimensionValue | undefined,
  paddingVertical: APP_STYLE_VALUES.SPACE_SIZES.sp6
}



const useThemedStyles = () => {
  const { theme } = useAppTheme();


  const borderStyles: StyleSheet.NamedStyles<IBorderStylesheet> = StyleSheet.create({
    default: {
      borderWidth: 1,
      borderColor: theme.grayScale200,
    },
    dashedGray: {
      borderStyle: "dashed",
      borderWidth: 2,
      borderColor: theme.grayScale300,
    },
    primary: {
      borderWidth: 1,
      borderColor: theme.primary,
    },
    bottomUnderline: {
      borderBottomWidth: 2,
      borderColor: theme.grayScale200,
    }

  })

  const cardStyles: StyleSheet.NamedStyles<ICardStylesheet> = StyleSheet.create({
    default: {
      ...COMMON_CARD_STYLES,
      borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.lg,
      borderColor: theme.grayScale200,
      backgroundColor: theme.grayScale50,

    },
    dark: {
      ...COMMON_CARD_STYLES,
      borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.md,
      borderColor: theme.grayScale200,
      backgroundColor: theme.grayScale50,

    },
    medium: {
      ...COMMON_CARD_STYLES,
      borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.md,
      borderColor: theme.grayScale100,
      backgroundColor: theme.grayScale100,

    },
    primary: {
      ...COMMON_CARD_STYLES,
      borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.md,
      borderColor: theme.primary,
      backgroundColor: "transparent",
    },
  })

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

  const inputStyles = StyleSheet.create({
    default: {
      height: WH_SIZES.lg,
      borderRadius: RADIUS_SIZES.lg,
      padding: SPACE_SIZES.sp4,
      color: theme.grayScale900,
      ...borderStyles.default
    },
    inputFocused: {
      ...borderStyles.primary
    },
    inputError: {
      borderColor: theme.error,
    },
  })

  const buttonStyles: StyleSheet.NamedStyles<IButtonStylesheet> = StyleSheet.create({

    buttonPrimarySolid: {
      ...COMMON_BUTTON_STYLES,
      backgroundColor: theme.primary,
      borderColor: COMMON_COLOURS.primaryDarken10,
      ...shadowStyles.dropShadowSm
    },
    badgePrimarySolid: {
      ...COMMON_BUTTON_STYLES,

      backgroundColor: theme.primary,
      borderColor: COMMON_COLOURS.primary,
      height: APP_STYLE_VALUES.WH_SIZES.xxs,
      padding: APP_STYLE_VALUES.SPACE_SIZES.sp0,
      display: "flex",
      alignItems: "center",
      ...shadowStyles.dropShadowSm
    },


    buttonPrimarySolidPressed: {
      ...COMMON_BUTTON_STYLES,
      backgroundColor: theme.primary,
      borderColor: COMMON_COLOURS.primaryDarken10,
      opacity: 0.8,
      ...shadowStyles.dropShadowSm
    },

    badgeGrayscale600Solid: {
      ...COMMON_BUTTON_STYLES,
      backgroundColor: theme.grayScale600,
      borderColor: theme.grayScale600,
      height: APP_STYLE_VALUES.WH_SIZES.xxs,
      padding: APP_STYLE_VALUES.SPACE_SIZES.sp0,
      display: "flex",
      alignItems: "center",
      ...shadowStyles.dropShadowSm
    },
    buttonPrimarySolidDisabled: {
      ...COMMON_BUTTON_STYLES,
      backgroundColor: theme.primary,
      borderColor: COMMON_COLOURS.primaryDarken10,
      opacity: 0.5,
      ...shadowStyles.dropShadowSm
    },

    badgeOutlined: {
      ...COMMON_BUTTON_STYLES,
      minWidth: WH_SIZES.xl,
      height: WH_SIZES.sm,
      borderRadius: RADIUS_SIZES.lg,
      padding: SPACE_SIZES.sp2,
      paddingVertical: SPACE_SIZES.sp1,
      borderWidth: 1,
      backgroundColor: theme.appBackground,
      borderColor: theme.grayScale400,
    },
    badgeOutlinedPressed: {
      ...COMMON_BUTTON_STYLES,
      minWidth: WH_SIZES.xl,
      height: WH_SIZES.sm,
      borderRadius: RADIUS_SIZES.lg,
      padding: SPACE_SIZES.sp2,
      paddingVertical: SPACE_SIZES.sp1,
      borderWidth: 1,
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },

    buttonPrimaryOutlined: {
      ...COMMON_BUTTON_STYLES,
      backgroundColor: COMMON_COLOURS.transparent,
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
      height: '100%',
      position: 'relative',
      flex: 1,
      backgroundColor: theme.appBackground,
    },
  })

  return { borderStyles, buttonStyles, cardStyles, inputStyles, containerStyles, shadowStyles }
};

export type IThemedStyles = ReturnType<typeof useThemedStyles>;


export default useThemedStyles;
