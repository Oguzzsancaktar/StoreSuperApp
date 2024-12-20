import { useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

import { router } from "expo-router";

import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useAppAuthSession } from "@/contexts/AuthContext";
import useAppStyles from "@/hooks/useAppStyles";
import IUser from "@/interfaces/account/IUser";
import { useGetCurrentUserListingsQuery } from "@/services/accountServices";
import { useGetUsersListingItemsQuery } from "@/services/listingServices";

import { ButtonGoBack, ButtonStyled } from "../button";
import CardPostItem from "../cards/CardPostItem";
import CardSellerProfileInfo from "../cards/CardSellerProfileInfo";
import { InnerCommonContainer } from "../containers";
import Unauthorized from "../feedback/Unauthorized";
import ImageIconCircle from "../images/ImageIconCircle";
import ImageStyled from "../images/ImageStyled";
import FlatListStyled from "../override/FlatListStyled";
import IconHeart from "../svg/icon/IconHeart";
import IconSettingCog from "../svg/icon/IconSettingCog";
import { TextStyled } from "../typography";

interface IProps {
  profileId?: IUser["id"];
}
const ScreenProfile: React.FC<IProps> = ({ profileId }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const { authToken } = useAppAuthSession();
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme },
  } = useAppStyles();
  const {
    data: selectedUsersListingsData,
    isLoading: selectedUsersListingsIsLoading,
  } = useGetUsersListingItemsQuery(profileId || "", {
    skip: !profileId,
  });

  const {
    data: currentUserListingData,
    isLoading: currentUserListingsIsLoading,
  } = useGetCurrentUserListingsQuery(undefined, {
    skip: !authToken,
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
            height: !authToken
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
              height: "100%",
              width: "100%",
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
                  {authToken && (
                    <ButtonStyled
                      variant="badgeOutlined"
                      onPress={() => router.push(APP_ROUTES.DRAWER.FAVORITES)}
                    >
                      <View
                        style={[
                          commonStyles.flexStyles.rowCenterWrap,
                          {
                            width: "100%",
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
                  {/* {authToken  && (
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

      {authToken ? (
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
                { useNativeDriver: false }, // Yükseklik animasyonu için "false"
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
