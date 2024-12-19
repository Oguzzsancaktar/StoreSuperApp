import { useMemo } from "react";
import { Animated, View } from "react-native";

import { router } from "expo-router";

import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useAppAuthSession } from "@/contexts/AuthContext";
import useAppStyles from "@/hooks/useAppStyles";
import IUser from "@/interfaces/account/IUser";
import {
  useAddCurrentUserImageMutation,
  useGetCurrentUserInformationQuery,
  useGetCurrentUserListingsQuery,
  useGetUserProfileQuery,
} from "@/services/accountServices";
import dateUtils from "@/utils/dateUtils";

import { ButtonStyled } from "../button";
import Preloader from "../feedback/Preloader";
import ImageIconCircle from "../images/ImageIconCircle";
import ImageUserProfile from "../images/ImageUserProfile";
import InputImageUploader from "../input/InputImageUploader";
import SvgAnimLoadingSpinner from "../svg/animation/SvgAnimLoadingSpinner";
import { TextStyled } from "../typography";

interface IProps {
  scrollY: Animated.Value;
  profileId?: IUser["id"];
}
const CardSellerProfileInfo: React.FC<IProps> = ({ scrollY, profileId }) => {
  const { authToken } = useAppAuthSession();
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme },
  } = useAppStyles();

  const [uploadProfileImage, { isLoading: uploadImageIsLoading }] =
    useAddCurrentUserImageMutation();

  const { data: currentUserListingData } = useGetCurrentUserListingsQuery();
  const { data: currentUserData, isLoading: currentUserDataIsLoading } =
    useGetCurrentUserInformationQuery();

  const {
    data: selectedUserProfileData,
    isLoading: selectedUsersProfileIsLoading,
  } = useGetUserProfileQuery(profileId || "", {
    skip: !profileId,
  });

  const userProfileData = useMemo(() => {
    return profileId ? selectedUserProfileData : currentUserData;
  }, [profileId, selectedUserProfileData, currentUserData]);

  const avatarSize = scrollY.interpolate({
    inputRange: [0, 150], // 0'dan 150 birim scrolle kadar
    outputRange: [APP_STYLE_VALUES.WH_SIZES.xl6, APP_STYLE_VALUES.WH_SIZES.xl],
    extrapolate: "clamp", // Değerleri bu aralık dışında sınırla
  });

  const avatarPosition = scrollY.interpolate({
    inputRange: [0, 150], // 0'dan 150 birim scrolle kadar
    outputRange: [0, -140],
    extrapolate: "clamp", // Değerleri bu aralık dışında sınırla
  });

  const avatarMargin = scrollY.interpolate({
    inputRange: [0, 150], // 0'dan 150 birim scrolle kadar
    outputRange: [
      -APP_STYLE_VALUES.WH_SIZES.xl4 / 2,
      APP_STYLE_VALUES.WH_SIZES.sm,
    ],
    extrapolate: "clamp", // Değerleri bu aralık dışında sınırla
  });
  const avatarMarginTop = scrollY.interpolate({
    inputRange: [0, 150], // 0'dan 150 birim scrolle kadar
    outputRange: [0, APP_STYLE_VALUES.WH_SIZES.sm],
    extrapolate: "clamp", // Değerleri bu aralık dışında sınırla
  });

  const uploadScale = scrollY.interpolate({
    inputRange: [0, 50], // 0'dan 150 birim scrolle kadar
    outputRange: [1, 0],
    extrapolate: "clamp", // Değerleri bu aralık dışında sınırla
  });

  const infoOpacity = scrollY.interpolate({
    inputRange: [0, 50], // 0'dan 150 birim scrolle kadar
    outputRange: [1, 0],
    extrapolate: "clamp", // Değerleri bu aralık dışında sınırla
  });

  const cardSize = scrollY.interpolate({
    inputRange: [0, 150], // 0'dan 150 birim scrolle kadar
    outputRange: [APP_STYLE_VALUES.WH_SIZES.xl8, APP_STYLE_VALUES.WH_SIZES.xl4],
    extrapolate: "clamp", // Değerleri bu aralık dışında sınırla
  });

  const cardMargin = scrollY.interpolate({
    inputRange: [0, 150], // 0'dan 150 birim scrolle kadar
    outputRange: [
      -APP_STYLE_VALUES.SPACE_SIZES.sp15,
      -APP_STYLE_VALUES.SPACE_SIZES.sp23,
    ],
    extrapolate: "clamp", // Değerleri bu aralık dışında sınırla
  });

  const handleImageUpload = async (selectedImages: any[]) => {
    const formDataForMedia = new FormData();

    const file = selectedImages[0];
    if (!authToken || !file) {
      return;
    }

    if (file) {
      formDataForMedia.append("file", file, file.name);
    }
    try {
      const uploadedMediaUrls = await uploadProfileImage(
        formDataForMedia as any,
      ).unwrap();
    } catch (err) {
      console.log("err", err);
    }
  };

  if (currentUserDataIsLoading || selectedUsersProfileIsLoading) {
    return <Preloader />;
  }
  return (
    <Animated.View
      style={[
        themedStyles.cardStyles.default,
        commonStyles.flexStyles.colCenter,
        {
          borderWidth: 0,
          height: cardSize,
          overflow: "visible",
          width: "100%",
          marginTop: cardMargin,
        },
      ]}
    >
      <Animated.View
        style={[
          commonStyles.flexStyles.colCenter,
          {
            marginTop: -APP_STYLE_VALUES.SPACE_SIZES.sp10,
            marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp4,
            overflow: "visible",
            width: "100%",
          },
        ]}
      >
        <Animated.View
          style={[
            {
              left: avatarPosition,
              marginTop: avatarMargin,
            },
          ]}
        >
          <Animated.View
            style={[
              commonStyles.absolutePositionStyles.absoluteFill,
              {
                top: "auto",
                left: "auto",
                zIndex: 1,
                marginRight: APP_STYLE_VALUES.SPACE_SIZES.sp4,
                width: APP_STYLE_VALUES.WH_SIZES.xs,
                height: APP_STYLE_VALUES.WH_SIZES.xs,
                opacity: uploadScale,
              },
            ]}
          >
            <InputImageUploader
              isUploadButton={true}
              maxMedia={1}
              onChange={handleImageUpload}
            />
          </Animated.View>

          <Animated.View
            style={[
              {
                marginTop: avatarMarginTop,
                overflow: "hidden",
                borderColor: theme.grayScale100,
                width: avatarSize,
                height: avatarSize,
                borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.full,
              },
            ]}
          >
            {uploadImageIsLoading && (
              <View
                style={[
                  commonStyles.absolutePositionStyles.absoluteFill,
                  {
                    zIndex: 1,
                  },
                ]}
              >
                <ImageIconCircle
                  icon={<SvgAnimLoadingSpinner color={theme.white} />}
                  size={APP_STYLE_VALUES.WH_SIZES.xl6}
                />
              </View>
            )}
            <ImageUserProfile
              url={userProfileData?.image}
              iconSize={APP_STYLE_VALUES.WH_SIZES.lg}
            />
          </Animated.View>
        </Animated.View>
      </Animated.View>

      {userProfileData ? (
        <>
          <View
            style={[
              commonStyles.flexStyles.colCenter,
              {
                marginTop: -APP_STYLE_VALUES.SPACE_SIZES.sp0,
              },
            ]}
          >
            <View>
              <TextStyled fontSize="h6" fontWeight="semibold">
                {userProfileData?.firstName || ""}{" "}
                {userProfileData?.lastName || ""}
              </TextStyled>
            </View>
            <View style={[{ marginTop: -APP_STYLE_VALUES.SPACE_SIZES.sp1 }]}>
              <TextStyled fontSize="md" fontWeight="medium">
                {userProfileData.email.toLowerCase()}
              </TextStyled>
            </View>
          </View>

          <Animated.View
            style={[
              commonStyles.flexStyles.rowBetween,
              {
                gap: APP_STYLE_VALUES.SPACE_SIZES.sp4,
                marginVertical: APP_STYLE_VALUES.SPACE_SIZES.sp4,
                opacity: infoOpacity,
              },
            ]}
          >
            <View style={[commonStyles.flexStyles.colCenter]}>
              <TextStyled fontSize="sm" fontWeight="medium">
                Post Count
              </TextStyled>
              <TextStyled
                fontSize="md"
                fontWeight="semibold"
                customColor="grayScale900"
              >
                {currentUserListingData?.length?.toString() || ""}
              </TextStyled>
            </View>

            <View
              style={[
                commonStyles.flexStyles.colCenter,
                themedStyles.borderStyles.rightSeperator,
                themedStyles.borderStyles.leftSeperator,

                {
                  paddingHorizontal: APP_STYLE_VALUES.SPACE_SIZES.sp4,
                },
              ]}
            >
              <TextStyled fontSize="sm" fontWeight="medium">
                Language
              </TextStyled>
              <TextStyled
                fontSize="md"
                fontWeight="semibold"
                customColor="grayScale900"
              >
                {userProfileData?.language || "English"}
              </TextStyled>
            </View>

            <View style={[commonStyles.flexStyles.colCenter]}>
              <TextStyled fontSize="sm" fontWeight="medium">
                Register Date
              </TextStyled>
              <TextStyled
                fontSize="md"
                fontWeight="semibold"
                customColor="grayScale900"
              >
                {dateUtils.formatDateForMoment(
                  userProfileData.created,
                  "DATE_MOMENT",
                )}
              </TextStyled>
            </View>

            {/* <View style={[commonStyles.flexStyles.colCenter]}>
              <TextStyled fontSize="sm" fontWeight="semibold">
                Seller Type
              </TextStyled>
              <TextStyled fontSize="xs" fontWeight="medium">
                Business
              </TextStyled>
            </View> */}
          </Animated.View>
          <View
            style={[
              commonStyles.flexStyles.colCenter,
              { flex: 1, width: "100%" },
            ]}
          >
            {/* <TextStyled fontSize="sm" fontWeight="medium">
            {(listingItemDetailData?.listingAddress?.countryName ||
                      '') +
                      ', ' +
                      (listingItemDetailData?.listingAddress?.cityName + '')}
            </TextStyled> */}
          </View>
        </>
      ) : (
        <View style={{ width: "100%", gap: APP_STYLE_VALUES.SPACE_SIZES.sp4 }}>
          <TextStyled fontSize="h4" fontWeight="bold">
            Sign in to see profile
          </TextStyled>

          <ButtonStyled
            onPress={() => {
              router.push(APP_ROUTES.PUBLIC.LOGIN);
            }}
            text={"Login"}
            variant="primaryOutlined"
            gradientBg
          />
        </View>
      )}
    </Animated.View>
  );
};

export default CardSellerProfileInfo;
