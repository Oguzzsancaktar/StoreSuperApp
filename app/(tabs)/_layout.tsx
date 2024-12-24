import { Text, useWindowDimensions } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Href, Tabs } from "expo-router";

import ButtonActiveTab from "@/components/button/ButtonActiveTab";
import DrawerGlobal from "@/components/drawer/DrawerGlobal";
import IconHome from "@/components/svg/icon/IconHome";
import IconSearch from "@/components/svg/icon/IconSearch";
import IconPlusCircle from "@/components/svg/icon/circle/IconPlusCircle";
import IconMessageFilled from "@/components/svg/icon/filled/IconMessageFilled";
import IconProfileFilled from "@/components/svg/icon/filled/IconProfileFilled";
import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { ListingFilterProvider } from "@/contexts/ListingFilterContext";
import useAppStyles from "@/hooks/useAppStyles";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { width } = useWindowDimensions();

  const {
    themedStyles,
    themeContext: { theme },
  } = useAppStyles();

  return (
    <ListingFilterProvider>
      <DrawerGlobal />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.grayScale500,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: false, // useClientOnlyValue(false, false),
          tabBarStyle: {
            ...themedStyles.shadowStyles.dropShadow900,
            backgroundColor: theme.appBackground,
            height: APP_STYLE_VALUES.WH_SIZES.xl,
            width: width - 2 * APP_STYLE_VALUES.SPACE_SIZES.sp4,
            display: "flex",
            flexDirection: "row",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.full,
            borderWidth: 0,
            paddingBottom: 0,
            marginTop: 0,
            paddingHorizontal: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            elevation: 0,
            borderTopWidth: 0,
            position: "absolute",
            bottom: APP_STYLE_VALUES.SPACE_SIZES.sp4,
            left: APP_STYLE_VALUES.SPACE_SIZES.sp4,
            zIndex: 9999,
          },
          tabBarButton: ({ accessibilityState, to, ...rest }) => {
            const isSelected = accessibilityState?.selected || false;

            let label = "home";
            let Icon = IconHome;

            switch (true) {
              case to?.includes("timeline"):
                label = "Home";
                Icon = IconHome;
                break;
              case to?.includes("postList"):
                label = "Search";
                Icon = IconSearch;
                break;
              case to?.includes("addPost"):
                label = "";
                Icon = IconPlusCircle;
                break;

              case to?.includes("messages"):
                label = "Messages";
                Icon = IconMessageFilled;
                break;
              case to?.includes("profile"):
                label = "Profile";
                Icon = IconProfileFilled;
                break;
            }

            return (
              <ButtonActiveTab
                to={(to || APP_ROUTES.TABS.TIMELINE) as Href<string | object>}
                isActive={isSelected}
                icon={Icon}
                text={label}
              />
            );
          },
          tabBarBadgeStyle: {
            color: "white",
            borderRadius: 10,
          },
        }}
      >
        <Tabs.Screen
          name="timeline"
          options={{
            title: "Timeline",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="postList"
          options={{
            title: "Post List",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="addPost"
          options={{
            title: "Add Post",
            tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
          }}
        />
        <Tabs.Screen
          name="conversations"
          options={{
            title: "Messages",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
      </Tabs>
    </ListingFilterProvider>
  );
}
