import { useAppTheme } from '@/contexts/ThemeContext';
import { StyleSheet } from 'react-native';

const BUTTON_HEIGHT = 50;
const BUTTON_RADIUS = 5;
const BUTTON_PADDING = 10;

const COMMON_BUTTON_STYLES = {
  height: BUTTON_HEIGHT,
  borderRadius: BUTTON_RADIUS,
  padding: BUTTON_PADDING,
}

const useThemedStyles = () => {
  const { theme } = useAppTheme();

  return StyleSheet.create({
    // Component Styles
    buttonPrimarySolid: {
      ...COMMON_BUTTON_STYLES,
      backgroundColor: theme.primary,
      color: theme.white,
    },

    // Containers
    screenWrapperContainer: {
      flex: 1,
      backgroundColor: theme.appBackground,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.grayScale100,
    },
    text: {
      color: theme.grayScale900,
    },
  });
};

export default useThemedStyles;
