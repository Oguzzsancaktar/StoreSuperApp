import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Text, TouchableOpacity, View } from "react-native";

import { router } from "expo-router";

import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useAppAuthSession } from "@/contexts/AuthContext";
import { useModalState } from "@/contexts/ModalContext";
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
import IconBlock from "../svg/icon/IconBlock";
import IconSettingCog from "../svg/icon/IconSettingCog";

interface IProps {
  profileId?: IUser["id"];
}
const ScreenProfile: React.FC<IProps> = ({ profileId }) => {
  const { t } = useTranslation();

  const scrollY = useRef(new Animated.Value(0)).current;
  const { setModalContent } = useModalState();

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
    router.push(APP_ROUTES.PUBLIC.DRAWER.SETTINGS.LIST);
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
            {!profileId ? (
              <>
                <View style={{ width: APP_STYLE_VALUES.WH_SIZES.xl8 }}>
                  {authToken && (
                    <ButtonStyled
                      leftIcon="IconHeart"
                      text={t("common.favorites")}
                      variant="badgeOutlined"
                      onPress={() =>
                        router.push(APP_ROUTES.PUBLIC.DRAWER.FAVORITES)
                      }
                    ></ButtonStyled>
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

            {profileId && (
              <ImageIconCircle
                onPress={() => setModalContent("ModalReportContent")}
                bgColor="grayScale100"
                size={APP_STYLE_VALUES.WH_SIZES.xs}
                icon={
                  <IconBlock
                    width={APP_STYLE_VALUES.WH_SIZES.xs2}
                    height={APP_STYLE_VALUES.WH_SIZES.xs2}
                    color={theme.grayScale500}
                  />
                }
              />
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
