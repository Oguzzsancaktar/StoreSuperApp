import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Link, Tabs, Href } from 'expo-router';
import { Text, useWindowDimensions } from 'react-native';
import { useAppTheme } from '@/contexts/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSession } from '@/contexts/AuthContext';
import IconHome from '@/components/svg/icon/IconHome';

import ButtonActiveTab from '@/components/button/ButtonActiveTab';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import IconUpload from '@/components/svg/icon/IconUpload';
import APP_ROUTES from '@/constants/APP_ROUTES';
import IconProfileFilled from '@/components/svg/icon/filled/IconProfileFilled';
import IconMessageFilled from '@/components/svg/icon/filled/IconMessageFilled';
import IconFAQ from '@/components/svg/icon/IconFAQ';
import IconPlusCircle from '@/components/svg/icon/circle/IconPlusCircle';
import IconSearch from '@/components/svg/icon/IconSearch';

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
            width: width - 2 * APP_STYLE_VALUES.SPACE_SIZES.sp4,
            display: 'flex',
            flexDirection: 'row',
            margin: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.full,
            paddingHorizontal: APP_STYLE_VALUES.SPACE_SIZES.sp2,
          },
          tabBarButton: ({ accessibilityState, to, ...rest }) => {
            const isSelected = accessibilityState?.selected || false;

            let label = 'home';
            let Icon = IconHome;

            switch (true) {
              case to?.includes('timeline'):
                label = 'Home';
                Icon = IconHome;
                break;
              case to?.includes('postList'):
                label = 'Search';
                Icon = IconSearch;
                break;
              case to?.includes('addPost'):
                label = '';
                Icon = IconPlusCircle;
                break;

              case to?.includes('messages'):
                label = 'Messages';
                Icon = IconMessageFilled;
                break;
              case to?.includes('profile'):
                label = 'Profile';
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
            color: 'white',
            borderRadius: 10,
          },
        }}
      >
        <Tabs.Screen
          name="timeline"
          options={{
            title: 'Timeline',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="postList"
          options={{
            title: 'Post List',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="addPost"
          options={{
            title: 'Add Post',
            tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: 'Messages',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
