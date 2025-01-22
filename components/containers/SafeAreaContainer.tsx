import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";

import { useAppTheme } from "@/contexts/ThemeContext";

interface IProps {
  children: React.ReactNode;
  isTopEdgeInActive?: boolean;
}

const SafeAreaContainer: React.FC<IProps> = ({
  children,
  isTopEdgeInActive,
}) => {
  const { theme, isDark } = useAppTheme();

  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        animated
        backgroundColor="transparent"
        style={isDark ? "light" : "dark"}
      />

      <SafeAreaView
        edges={
          isTopEdgeInActive
            ? ["bottom", "left", "right"]
            : ["bottom", "left", "right", "top"]
        }
        style={{
          flex: 1,
          backgroundColor: theme.appBackground,
        }}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SafeAreaContainer;
