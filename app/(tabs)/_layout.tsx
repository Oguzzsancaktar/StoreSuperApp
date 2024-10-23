import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Link, Tabs } from 'expo-router';
import { Text, useWindowDimensions } from 'react-native';
import { useAppTheme } from '@/contexts/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSession } from '@/contexts/AuthContext';
import IconHome from '@/components/svg/icon/IconHome';
import IconBell from '@/components/svg/icon/IconBell';
import ButtonActiveTab from '@/components/button/ButtonActiveTab';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { session, isLoading } = useSession();
  const { width } = useWindowDimensions();

  const { theme } = useAppTheme();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.

  // if (!session) {
  //   return <Redirect href={APP_ROUTES.PUBLIC.WELCOME} />;
  // }

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.grayScale500,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: false, // useClientOnlyValue(false, false),
          tabBarStyle: {
            backgroundColor: theme.grayScale100,
            height: APP_STYLE_VALUES.WH_SIZES.xl,
            width: width - 2 * APP_STYLE_VALUES.SPACE_SIZES.sp6,
            display: 'flex',
            flexDirection: 'row',
            margin: 'auto',
            gap: 20,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            marginVertical: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            borderRadius: 15,
          },
          tabBarButton: ({ accessibilityState: { selected }, to, ...rest }) => {
            let label = 'home';
            let Icon = IconHome;

            switch (true) {
              case to.includes('Home'):
                label = 'home';
                Icon = IconHome;
                break;
              case to.includes('information'):
                label = 'information';
                Icon = IconBell;
                break;
            }

            return (
              <ButtonActiveTab
                to={to}
                isActive={selected}
                icon={Icon}
                text={label}
              />
            );
          },
          tabBarBadgeStyle: {
            color: 'white',
            borderRadius: 10,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Timeline',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
