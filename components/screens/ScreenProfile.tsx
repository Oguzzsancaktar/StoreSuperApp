import { View, Text, Animated, TouchableOpacity } from 'react-native';
import Unauthorized from '../feedback/Unauthorized';
import useThemedStyles from '@/hooks/useThemedStyles';
import { useSession } from '@/contexts/AuthContext';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import useCommonStyles from '@/hooks/useCommonStyles';
import ImageStyled from '../images/ImageStyled';
import { InnerCommonContainer } from '../containers';
import { ButtonGoBack, ButtonStyled } from '../button';
import { router } from 'expo-router';
import APP_ROUTES from '@/constants/APP_ROUTES';
import IconHeart from '../svg/icon/IconHeart';
import { TextStyled } from '../typography';
import { useAppTheme } from '@/contexts/ThemeContext';
import FlatListStyled from '../override/FlatListStyled';
import CardSellerProfileInfo from '../cards/CardSellerProfileInfo';
import ImageIconCircle from '../images/ImageIconCircle';
import IconSettingCog from '../svg/icon/IconSettingCog';
import CardPostItem from '../cards/CardPostItem';
import { useRef } from 'react';
import { useGetCurrentUserListingsQuery } from '@/services/accountServices';
import IUser from '@/interfaces/account/IUser';
import { useGetUsersListingItemsQuery } from '@/services/listingServices';

interface IProps {
  profileId?: IUser['id'];
}
const ScreenProfile: React.FC<IProps> = ({ profileId }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const { session } = useSession();
  const themedStyles = useThemedStyles();
  const commonStyles = useCommonStyles();
  const { theme } = useAppTheme();

  const {
    data: selectedUsersListingsData,
    isLoading: selectedUsersListingsIsLoading,
  } = useGetUsersListingItemsQuery(profileId || '', {
    skip: !profileId,
  });

  const {
    data: currentUserListingData,
    isLoading: currentUserListingsIsLoading,
  } = useGetCurrentUserListingsQuery(undefined, {
    skip: !session,
  });

  const handleSettingsPress = () => {
    router.push(APP_ROUTES.DRAWER.SETTINGS);
  };

  return (
    <>
      <View
        style={[
          themedStyles.cardStyles.default,
          {
            padding: 0,
            paddingVertical: 0,
            borderWidth: 0,
            height: !session
              ? APP_STYLE_VALUES.WH_SIZES.xl5
              : APP_STYLE_VALUES.WH_SIZES.xl11,
          },
        ]}
      >
        {/* Card Background  */}
        <View
          style={[
            commonStyles.absolutePositionStyles.absoluteFill,
            {
              flex: 1,
              height: '100%',
              width: '100%',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            },
          ]}
        >
          <ImageStyled imageId="BANNER_PROFILE_DEFAULT" />
        </View>

        {/* Top Card */}
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
            {!profileId ? (
              <>
                <View style={{ width: APP_STYLE_VALUES.WH_SIZES.xl8 }}>
                  {session && (
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
                  )}
                </View>
                <View
                  style={[
                    commonStyles.flexStyles.rowWrap,
                    { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
                  ]}
                >
                  {/* {session && (
                    <ImageIconCircle
                      icon={<IconBookmark color={theme.white} />}
                    />
                  )} */}
                  <TouchableOpacity onPress={handleSettingsPress}>
                    <ImageIconCircle
                      icon={<IconSettingCog color={theme.white} />}
                    />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <ButtonGoBack />
            )}
          </View>
        </InnerCommonContainer>
      </View>

      {session ? (
        <InnerCommonContainer>
          <View
            style={{
              flex: 1,
              gap: APP_STYLE_VALUES.SPACE_SIZES.sp4,
            }}
          >
            <CardSellerProfileInfo profileId={profileId} scrollY={scrollY} />

            <Animated.ScrollView
              showsVerticalScrollIndicator={false}
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
                  isLoading={
                    profileId
                      ? selectedUsersListingsIsLoading
                      : currentUserListingsIsLoading
                  }
                  scrollEnabled={false}
                  showGradients={false}
                  data={
                    profileId
                      ? selectedUsersListingsData
                      : currentUserListingData
                  }
                  renderItem={({ item }) => <CardPostItem post={item} />}
                />
              </View>
            </Animated.ScrollView>
          </View>
        </InnerCommonContainer>
      ) : (
        <Unauthorized showGoBack={false} />
      )}
    </>
  );
};

export default ScreenProfile;
