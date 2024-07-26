import { useAppTheme } from '@/contexts/ThemeContext';
import { StyleSheet } from 'react-native';


const useThemedStyles = () => {
  const { theme } = useAppTheme();

  return StyleSheet.create({
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
