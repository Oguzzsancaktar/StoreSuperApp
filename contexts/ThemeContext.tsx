import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';
import APP_THEMES from '@/constants/APP_THEMES';
import { IAppTheme } from '@/interfaces/theme';
import APP_STORAGE_KEYS from '@/constants/APP_STORAGE_KEYS';
import { useStorageState } from '@/hooks/useStorageState';

interface ThemeContextType {
  theme: IAppTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
