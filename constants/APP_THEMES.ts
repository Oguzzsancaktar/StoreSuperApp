import { IAppColourNames, IAppThemeTypes, ICommonColours, IGrayScaleColours } from "@/interfaces/theme";

export const COMMON_COLOURS: ICommonColours = {
  // Branding
  primary: "#FFB800",
  primaryLight: "#FFD66C",
  primaryDarken10: "#deb853",
  // Alert & Status
  success: "#00C247",
  info: "#004CE8",
  warning: "#FFBE16",
  error: "#EA2929",
  disabled: "#F7F7F7",
  // Others
  white: "#FFFFFF",
  black: "#000000",
}

const LIGHT_MODE_GRAYSCALE: IGrayScaleColours = {
  grayScale50: "#FAFAFA",
  grayScale100: "#F5F5F5",
  grayScale200: "#EEEEEE",
  grayScale300: "#E0E0E0",
  grayScale400: "#BDBDBD",
  grayScale500: "#9E9E9E",
  grayScale600: "#838383",
  grayScale700: "#616161",
  grayScale800: "#424242",
  grayScale900: "#242424",
}

const DARK_MODE_GRAYSCALE: IGrayScaleColours = {
  grayScale50: "#242424",
  grayScale100: "#424242",
  grayScale200: "#616161",
  grayScale300: "#838383",
  grayScale400: "#9E9E9E",
  grayScale500: "#BDBDBD",
  grayScale600: "#E0E0E0",
  grayScale700: "#EEEEEE",
  grayScale800: "#F5F5F5",
  grayScale900: "#FAFAFA",
}

const LIGHT_MODE_COLOURS: IAppColourNames = {
  appBackground: COMMON_COLOURS.white
}

const DARK_MODE_COLOURS: IAppColourNames = {
  appBackground: "#1E1E1E"
}

const APP_THEMES: IAppThemeTypes = {
  light: {
    ...COMMON_COLOURS,
    ...LIGHT_MODE_GRAYSCALE,
    ...LIGHT_MODE_COLOURS,

  },
  dark: {
    ...COMMON_COLOURS,
    ...DARK_MODE_GRAYSCALE,
    ...DARK_MODE_COLOURS
  },
};

export default APP_THEMES
