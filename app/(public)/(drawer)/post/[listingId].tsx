import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { map } from "lodash";

import { ButtonStyled } from "@/components/button";
import CardListingActions from "@/components/cards/CardListingActions";
import CardPostCategory from "@/components/cards/CardPostCategory";
import CardPostPrice from "@/components/cards/CardPostPrice";
import CardSellerInfo from "@/components/cards/CardSellerInfo";
import CardListingDetailOptions from "@/components/cards/listing/CardListingDetailOptions";
import { InnerCommonContainer } from "@/components/containers";
import ScreenWrapperContainer from "@/components/containers/ScreenWrapperContainer";
import EmptyState from "@/components/feedback/EmptyState";
import Preloader from "@/components/feedback/Preloader";
import ImageCarousel from "@/components/images/ImageCarousel";
import ImageIconCircle from "@/components/images/ImageIconCircle";
import MapGeoLoaction from "@/components/map/MapGeoLoaction";
import ScrollViewStyled from "@/components/override/ScrollViewStyled";
import IconCalendar from "@/components/svg/icon/IconCalendar";
import IconLocation from "@/components/svg/icon/IconLocation";
import { TextStyled } from "@/components/typography";
import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useAppAuthSession } from "@/contexts/AuthContext";
import useAppStyles from "@/hooks/useAppStyles";
import IUser from "@/interfaces/account/IUser";
import { useGetListingItemDetailsQuery } from "@/services/listingServices";
import dateUtils from "@/utils/dateUtils";
import routerUtils from "@/utils/routerUtils";
import { toastWarning } from "@/utils/toastUtils";

const ListingDetailPage = () => {
  const {
    themedStyles,
    commonStyles,
    themeContext: { theme },
  } = useAppStyles();
  const { t } = useTranslation();
  const { authToken, userTokenInfo } = useAppAuthSession();

  const { listingId } = useLocalSearchParams();

  const { data: listingItemDetailData, isLoading } =
    useGetListingItemDetailsQuery(listingId as string);

  const handleSendMessageClick = () => {
    if (!authToken) {
      toastWarning(t("toast.message"));
      return;
    }

    router.push({
      pathname: routerUtils.buildRoute(APP_ROUTES.PRIVATE.CHAT.CHAT_REGISTRY, {
        chatRegistryId: "new",
      }),
      params: { listingId: listingId },
    });
  };

  const mediaUrls = useMemo(() => {
    return map(listingItemDetailData?.media, (m) => m.url);
  }, [listingItemDetailData]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!listingItemDetailData) {
    return <EmptyState />;
  }

  return (
    <ScreenWrapperContainer
      showGoBack={true}
      showBorderUnderline={true}
      rightElement={
        <CardListingActions showViewCount={true} post={listingItemDetailData} />
      }
    >
      <ScrollViewStyled>
        <View style={{ width: "100%", height: 300 }}>
          <ImageCarousel imageUrls={mediaUrls} />
        </View>

        <InnerCommonContainer>
          <View
            style={[
              commonStyles.flexStyles.colStart,
              { width: "100%", gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
            ]}
          >
            <TextStyled
              textTransform="capitalize"
              fontSize="h3"
              fontWeight="bold"
              textAlignment="left"
            >
              {listingItemDetailData?.name || ""}
            </TextStyled>

            <View
              style={[
                commonStyles.flexStyles.rowBetween,
                {
                  gap: APP_STYLE_VALUES.SPACE_SIZES.sp4,
                },
              ]}
            >
              <View
                style={[
                  commonStyles.flexStyles.rowStart,
                  {
                    flex: 1,
                    width: "100%",
                    gap: APP_STYLE_VALUES.SPACE_SIZES.sp1,
                    alignItems: "center",
                  },
                ]}
              >
                <View style={{ width: APP_STYLE_VALUES.WH_SIZES.xs2 }}>
                  <IconLocation color={theme.grayScale500} />
                </View>
                <TextStyled
                  fontSize="sm"
                  fontWeight="regular"
                  customColor={"grayScale500"}
                  textAlignment="left"
                  numberOfLines={1}
                >
                  {listingItemDetailData?.listingAddress &&
                    listingItemDetailData?.listingAddress?.countryName +
                      " " +
                      listingItemDetailData?.listingAddress?.cityName}
                </TextStyled>
              </View>

              <View
                style={[
                  commonStyles.flexStyles.rowStart,
                  {
                    width: APP_STYLE_VALUES.WH_SIZES.xl5,
                    gap: APP_STYLE_VALUES.SPACE_SIZES.sp1,
                    alignItems: "center",
                  },
                ]}
              >
                <View style={{ width: APP_STYLE_VALUES.WH_SIZES.xs2 }}>
                  <IconCalendar color={theme.grayScale500} />
                </View>
                <TextStyled
                  fontSize="sm"
                  fontWeight="regular"
                  customColor={"grayScale500"}
                  textAlignment="left"
                  numberOfLines={1}
                >
                  {dateUtils.formatDateForMoment(
                    listingItemDetailData?.created ?? "",
                    "DATE_MOMENT_MONTH_NAME",
                  )}
                </TextStyled>
              </View>
            </View>
          </View>
        </InnerCommonContainer>

        <InnerCommonContainer>
          <View
            style={[
              commonStyles.flexStyles.colStart,
              {
                width: "100%",
                gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
              },
            ]}
          >
            <CardPostPrice
              negotiable={listingItemDetailData?.negotiable}
              formattedPrice={listingItemDetailData?.formattedPrice}
            />
            <CardPostCategory
              tags={listingItemDetailData.tags}
              categories={listingItemDetailData?.categories || []}
            />
            <CardListingDetailOptions options={listingItemDetailData.options} />

            <View
              style={{
                gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
                width: "100%",
              }}
            >
              <TextStyled fontSize="h4" fontWeight="bold" textAlignment="left">
                {t("common.description")}
              </TextStyled>
              <TextStyled
                fontSize="md"
                fontWeight="medium"
                textAlignment="left"
              >
                {listingItemDetailData?.description || ""}
              </TextStyled>
            </View>

            <View style={{ width: "100%" }}>
              <MapGeoLoaction
                geoLocation={{
                  latitude: listingItemDetailData.listingAddress?.latitude,
                  longitude: listingItemDetailData.listingAddress?.longitude,
                }}
              />
            </View>

            {listingItemDetailData?.listingAddress?.fullAddress &&
              listingItemDetailData?.listingAddress &&
              listingItemDetailData?.listingAddress?.showFullAddress && (
                <View
                  style={[
                    themedStyles.cardStyles.default,
                    commonStyles.flexStyles.colBetween,
                    {
                      paddingTop: APP_STYLE_VALUES.SPACE_SIZES.sp2,
                      paddingVertical: APP_STYLE_VALUES.SPACE_SIZES.sp2,
                    },
                  ]}
                >
                  <View
                    style={[
                      commonStyles.flexStyles.rowStart,
                      {
                        gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
                      },
                    ]}
                  >
                    <View style={{ width: APP_STYLE_VALUES.WH_SIZES.sm }}>
                      <ImageIconCircle
                        bgColor={"grayScale300"}
                        icon={<IconLocation color={theme.grayScale900} />}
                      />
                    </View>

                    <View style={commonStyles.flexStyles.colStart}>
                      <TextStyled fontSize="h4" fontWeight="bold">
                        {t("common.fullAddress")}
                      </TextStyled>
                      <View>
                        <TextStyled
                          fontSize="sm"
                          fontWeight="medium"
                          customColor="grayScale500"
                          textAlignment="left"
                        >
                          {listingItemDetailData?.listingAddress?.fullAddress}
                        </TextStyled>
                      </View>
                    </View>
                  </View>
                </View>
              )}

            <View style={{ width: "100%" }}>
              <CardSellerInfo
                allowMessaging={listingItemDetailData?.allowMessaging}
                allowPhoneCalls={listingItemDetailData?.allowPhoneCalls}
                user={listingItemDetailData?.user || ({} as IUser)}
              />
            </View>
          </View>
        </InnerCommonContainer>
      </ScrollViewStyled>

      {listingItemDetailData?.user?.id !== userTokenInfo?.Id && (
        <View
          style={[
            commonStyles.flexStyles.rowWrap,
            {
              gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
              marginTop: APP_STYLE_VALUES.SPACE_SIZES.sp4,
              marginHorizontal: APP_STYLE_VALUES.SPACE_SIZES.sp4,
            },
          ]}
        >
          {/* <ImageIconCircle
          gradientBg={true}
          radius={APP_STYLE_VALUES.RADIUS_SIZES.lg}
          borderColor="primary"
          bgColor="appBackground"
          icon={<IconUser color={theme.grayScale900} />}
          size={APP_STYLE_VALUES.WH_SIZES.lg}
        /> */}

          <ButtonStyled
            leftIcon="IconSendMessage"
            variant="primarySolid"
            text={t("common.sendMessage")}
            onPress={handleSendMessageClick}
          />
        </View>
      )}
    </ScreenWrapperContainer>
  );
};

export default ListingDetailPage;
