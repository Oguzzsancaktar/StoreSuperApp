import { ButtonStyled } from '@/components/button';
import CardNewestPostings from '@/components/cards/CardNewestPostings';
import CardSellerProfileInfo from '@/components/cards/CardSellerProfileInfo';
import { InnerCommonContainer } from '@/components/containers';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import ImageStyled from '@/components/images/ImageStyled';
import ImageIconCircle from '@/components/images/ImageIconCircle';
import IconBookmark from '@/components/svg/icon/IconBookmark';
import IconHeart from '@/components/svg/icon/IconHeart';
import IconSettingCog from '@/components/svg/icon/IconSettingCog';
import { TextStyled } from '@/components/typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import { useGetCurrentUserListingsQuery } from '@/services/accountServices';
import { router, usePathname } from 'expo-router';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Text,
  StyleSheet,
} from 'react-native';
import CardPostItem from '@/components/cards/CardPostItem';
import FlatListStyled from '@/components/override/FlatListStyled';
import APP_ROUTES from '@/constants/APP_ROUTES';
import ScrollViewStyled from '@/components/override/ScrollViewStyled';
import { useSession } from '@/contexts/AuthContext';
import Unauthorized from '@/components/feedback/Unauthorized';
import { useRef } from 'react';

const ProfileScreen = () => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const { theme } = useAppTheme();
  const { session } = useSession();
  const { data: currentUserListingData } = useGetCurrentUserListingsQuery();

  const scrollY = useRef(new Animated.Value(0)).current;

  const handleSettingsPress = () => {
    router.push(APP_ROUTES.DRAWER.SETTINGS);
  };

  return (
    <ScreenWrapperContainer>
      <View
        style={[
          themedStyles.cardStyles.default,
          {
            padding: 0,
            paddingVertical: 0,
            borderWidth: 0,
            height: APP_STYLE_VALUES.WH_SIZES.xl11,
          },
        ]}
      >
        <View
          style={[
            commonStyles.absolutePositionStyles.absoluteFill,
            {
              flex: 1,
              height: '100%',
              width: '100%',
            },
          ]}
        >
          <ImageStyled imageId="BANNER_PROFILE_DEFAULT" />
        </View>

        <InnerCommonContainer>
          <View
            style={[
              commonStyles.flexStyles.rowBetween,
              {
                marginTop: APP_STYLE_VALUES.SPACE_SIZES.sp12,
                gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
              },
            ]}
          >
            {/* @todo add it to button compoennt for icon */}
            <View style={{ width: APP_STYLE_VALUES.WH_SIZES.xl8 }}>
              <ButtonStyled
                variant="badgeOutlined"
                onPress={() => router.push(APP_ROUTES.DRAWER.FAVORITES)}
              >
                <View
                  style={[
                    commonStyles.flexStyles.rowCenterWrap,
                    {
                      width: '100%',
                      gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
                    },
                  ]}
                >
                  <View
                    style={[
                      commonStyles.flexStyles.rowStart,
                      { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
                    ]}
                  >
                    <IconHeart color={theme.grayScale900} />

                    <View>
                      <TextStyled
                        textAlignment="left"
                        fontSize="lg"
                        fontWeight="semibold"
                        customColor="grayScale900"
                      >
                        Favorites
                      </TextStyled>
                    </View>
                  </View>
                </View>
              </ButtonStyled>
            </View>
            <View
              style={[
                commonStyles.flexStyles.rowWrap,
                { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
              ]}
            >
              <ImageIconCircle icon={<IconBookmark color={theme.white} />} />

              <TouchableOpacity onPress={handleSettingsPress}>
                <ImageIconCircle
                  icon={<IconSettingCog color={theme.white} />}
                />
              </TouchableOpacity>
            </View>
          </View>
        </InnerCommonContainer>
      </View>

      <InnerCommonContainer>
        {session ? (
          <View
            style={{
              flex: 1,
              gap: APP_STYLE_VALUES.SPACE_SIZES.sp4,
            }}
          >
            <CardSellerProfileInfo scrollY={scrollY} />

            <Animated.ScrollView
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false } // Yükseklik animasyonu için "false"
              )}
              scrollEventThrottle={16} // Daha pürüzsüz bir animasyon
            >
              <View
                onStartShouldSetResponder={() => true}
                style={{ flex: 1, gap: APP_STYLE_VALUES.SPACE_SIZES.sp4 }}
              >
                <FlatListStyled
                  showGradients={false}
                  data={currentUserListingData}
                  renderItem={({ item }) => <CardPostItem post={item} />}
                />
              </View>
            </Animated.ScrollView>
          </View>
        ) : (
          <Unauthorized showGoBack={false} />
        )}
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default ProfileScreen;
