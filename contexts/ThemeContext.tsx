// contexts/ThemeContext.tsx
import React, { ReactNode, createContext, useContext, useMemo } from "react";

import ToastManager from "toastify-react-native";

import APP_STORAGE_KEYS from "@/constants/APP_STORAGE_KEYS";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import APP_THEMES from "@/constants/APP_THEMES";
import APP_TYPOGRAPHY from "@/constants/APP_TYPOGRAPHY";
import { useStorageState } from "@/hooks/useStorageState";
import { IAppTheme } from "@/interfaces/theme";

interface ThemeContextType {
  theme: IAppTheme;
  toggleTheme: () => void;

  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [[isLoading, authToken], setSession] = useStorageState(
    APP_STORAGE_KEYS.APP_THEME,
  );
  const oppositeTheme = authToken === "dark" ? "light" : "dark";

  const toggleTheme = () => {
    setSession(oppositeTheme);
  };

  const theme = useMemo(
    () => APP_THEMES[(authToken as typeof oppositeTheme) || "dark"],
    [authToken],
  );

  const isDark = useMemo(() => {
    return theme.grayScale100 === APP_THEMES.dark.grayScale100;
  }, [theme, APP_THEMES]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,

        isDark,
      }}
    >
      {/* @todo  seperate the provider for toasts. */}
      <ToastManager
        animationIn={"slideInLeft"}
        animationOut={"slideOutRight"}
        textStyle={{
          marginBottom: -5,
          fontFamily: "BRShapeMedium",
          fontSize: APP_TYPOGRAPHY.fontSizes.md,
        }}
        theme={authToken ?? "light"}
        height={APP_STYLE_VALUES.WH_SIZES.md}
        style={{ paddingVertical: 0 }}
        showProgressBar={false}
        showCloseIcon={false}
        duration={2000}
      />
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
