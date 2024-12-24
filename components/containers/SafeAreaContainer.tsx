import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import { concat } from "lodash";

import { useAppTheme } from "@/contexts/ThemeContext";

interface IProps {
  children: React.ReactNode;
  isTopEdgeActive?: boolean;
}

const SafeAreaContainer: React.FC<IProps> = ({ children, isTopEdgeActive }) => {
  const { theme, isDark } = useAppTheme();

  console.log(
    "---",
    concat(["bottom", "left", "right"], isTopEdgeActive ? ["top"] : []),
  );
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        animated
        backgroundColor="transparent"
        style={isDark ? "light" : "dark"}
      />

      <SafeAreaView
        edges={concat(
          ["bottom", "left", "right"],
          isTopEdgeActive ? ["top"] : [],
        )}
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
