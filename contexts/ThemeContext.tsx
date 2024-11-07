// contexts/ThemeContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import APP_THEMES from '@/constants/APP_THEMES';
import { IAppTheme } from '@/interfaces/theme';
import APP_STORAGE_KEYS from '@/constants/APP_STORAGE_KEYS';
import { useStorageState } from '@/hooks/useStorageState';

interface ThemeContextType {
  theme: IAppTheme;
  toggleTheme: () => void;
  useSafeAreaState: boolean;
  isDark: boolean;
  setUseSafeArea: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [useSafeAreaState, setUseSafeAreaState] = useState<boolean>(true);

  const setUseSafeArea = useCallback((value: boolean) => {
    setUseSafeAreaState(value);
  }, []);

  const [[isLoading, session], setSession] = useStorageState(
    APP_STORAGE_KEYS.APP_THEME
  );
  const oppositeTheme = session === 'dark' ? 'light' : 'dark';

  const toggleTheme = () => {
    setSession(oppositeTheme);
  };

  const theme = useMemo(
    () => APP_THEMES[(session as typeof oppositeTheme) || 'dark'],
    [session]
  );

  const isDark = useMemo(() => {
    return theme.grayScale100 === APP_THEMES.dark.grayScale100;
  }, [theme, APP_THEMES]);

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, useSafeAreaState, setUseSafeArea, isDark }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
