import { useAppTheme } from "@/contexts/ThemeContext";
import useThemedStyles from "./useThemedStyles";
import useCommonStyles from "./useCommonStyles";

const useAppStyles = () => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const themeContext = useAppTheme();

  return { commonStyles, themedStyles, themeContext };
};

export default useAppStyles;
