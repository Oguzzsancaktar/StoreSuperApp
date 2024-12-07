import { ButtonStyled } from '@/components/button';
import CardListingActions from '@/components/cards/CardListingActions';
import CardPostCategory from '@/components/cards/CardPostCategory';
import CardPostPrice from '@/components/cards/CardPostPrice';
import CardSellerInfo from '@/components/cards/CardSellerInfo';
import CardListingDetailOptions from '@/components/cards/listing/CardListingDetailOptions';
import { InnerCommonContainer } from '@/components/containers';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import ImageCarousel from '@/components/images/ImageCarousel';
import ImageIconCircle from '@/components/images/ImageIconCircle';
import MapGeoLoaction from '@/components/map/MapGeoLoaction';
import IconLocation from '@/components/svg/icon/IconLocation';
import IconSendMessage from '@/components/svg/icon/IconSendMessage';
import IconUser from '@/components/svg/icon/IconUser';
import { TextStyled } from '@/components/typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useSession } from '@/contexts/AuthContext';
import { useAppTheme } from '@/contexts/ThemeContext';
import useCommonStyles from '@/hooks/useCommonStyles';
import IUser from '@/interfaces/account/IUser';
import {
  useGetListingItemDetailsQuery,
  useGetViewCountQuery,
} from '@/services/listingServices';
import { toastWarning } from '@/utils/toastUtils';
import { router, useLocalSearchParams } from 'expo-router';
import { map } from 'lodash';
import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';

const ListingDetailPage = () => {
  const commonStyles = useCommonStyles();
  const { session } = useSession();
  const { theme } = useAppTheme();

  const { listingId } = useLocalSearchParams();

  const { data: listingItemDetailData, isLoading } =
    useGetListingItemDetailsQuery(listingId as string);

  const handleSendMessageClick = () => {
    if (!session) {
      toastWarning('Login For Message');
      return;
    }

    router.push({
      // @todo fix find best practice for constant all routes
      pathname: ('/(private)/chat/' + 'new') as any,
      params: { listingId: listingId },
    });
  };

  const mediaUrls = useMemo(() => {
    return map(listingItemDetailData?.media, (m) => m.url);
  }, [listingItemDetailData]);

  if (isLoading || !listingItemDetailData) {
    return <ScreenWrapperContainer>{null}</ScreenWrapperContainer>;
  }

  return (
    <ScreenWrapperContainer
      showGoBack={true}
      showBorderUnderline={true}
      rightElement={
        <CardListingActions
          favoriteCount={listingItemDetailData.favoriteCount}
          showViewCount={true}
          listingTitle={listingItemDetailData.name}
          listingId={listingItemDetailData.id}
          isFavorite={listingItemDetailData.isFavorite}
        />
      }
    >
      <ScrollView
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          gap: APP_STYLE_VALUES.SPACE_SIZES.sp6,
        }}
      >
        <View
          onStartShouldSetResponder={() => true} // @todo fix drag problem
          style={[
            commonStyles.flexStyles.colStart,
            {
              width: '100%',
              gap: APP_STYLE_VALUES.SPACE_SIZES.sp4,
            },
          ]}
        >
          <InnerCommonContainer>
            <View style={[commonStyles.flexStyles.colStart, { width: '100%' }]}>
              <TextStyled fontSize="h3" fontWeight="bold" textAlignment="left">
                {listingItemDetailData?.name || ''}
              </TextStyled>

              <View
                style={[
                  commonStyles.flexStyles.rowStart,
                  {
                    width: '100%',
                    gap: APP_STYLE_VALUES.SPACE_SIZES.sp1,
                    alignItems: 'center',
                  },
                ]}
              >
                <View style={{ width: APP_STYLE_VALUES.WH_SIZES.xs2 }}>
                  <IconLocation color={theme.grayScale400} />
                </View>

                <View style={[]}>
                  <TextStyled
                    textAlignment="left"
                    fontSize="md"
                    fontWeight="bold"
                    customColor={'grayScale400'}
                  >
                    {(listingItemDetailData?.listingAddress?.countryName ||
                      '') +
                      ', ' +
                      (listingItemDetailData?.listingAddress?.cityName + '')}
                  </TextStyled>
                </View>
              </View>
            </View>
          </InnerCommonContainer>

          <View style={{ width: '100%', height: 300 }}>
            <ImageCarousel imageUrls={mediaUrls} />
          </View>

          <InnerCommonContainer>
            <View
              style={[
                commonStyles.flexStyles.colStart,
                {
                  width: '100%',
                  gap: APP_STYLE_VALUES.SPACE_SIZES.sp4,
                },
              ]}
            >
              <View
                style={{
                  gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
                }}
              >
                <TextStyled
                  fontSize="h4"
                  fontWeight="bold"
                  textAlignment="left"
                >
                  Description
                </TextStyled>
                <TextStyled
                  fontSize="md"
                  fontWeight="medium"
                  textAlignment="left"
                >
                  {listingItemDetailData?.description || ''}
                </TextStyled>
              </View>
              <View style={{ width: '100%' }}>
                <CardPostPrice
                  negotiable={listingItemDetailData?.negotiable}
                  formattedPrice={listingItemDetailData?.formattedPrice}
                />
              </View>
              <View style={{ width: '100%' }}>
                <CardPostCategory
                  categories={listingItemDetailData?.categories || []}
                />
              </View>
              <CardListingDetailOptions
                options={listingItemDetailData.options}
              />

              <View style={{ width: '100%' }}>
                <MapGeoLoaction
                  geoLocation={{
                    latitude: listingItemDetailData.listingAddress?.latitude,
                    longitude: listingItemDetailData.listingAddress?.longitude,
                  }}
                />
              </View>

              <View style={{ width: '100%' }}>
                <CardSellerInfo
                  allowMessaging={listingItemDetailData.allowMessaging}
                  allowPhoneCalls={listingItemDetailData.allowPhoneCalls}
                  user={listingItemDetailData?.user || ({} as IUser)}
                />
              </View>
            </View>
          </InnerCommonContainer>
        </View>
      </ScrollView>

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

        {/* @todo add it to button compoennt for icon */}
        <View style={{ flex: 1 }}>
          <ButtonStyled
            variant="buttonPrimarySolid"
            onPress={handleSendMessageClick}
          >
            <View
              style={[
                commonStyles.flexStyles.rowCenterWrap,
                { width: '100%', gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
              ]}
            >
              <View
                style={[
                  commonStyles.flexStyles.rowCenter,
                  { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
                ]}
              >
                <IconSendMessage color={theme.white} />

                <View>
                  <TextStyled
                    textAlignment="left"
                    fontSize="lg"
                    fontWeight="semibold"
                    customColor="white"
                  >
                    Send Message
                  </TextStyled>
                </View>
              </View>
            </View>
          </ButtonStyled>
        </View>
      </View>
    </ScreenWrapperContainer>
  );
};

export default ListingDetailPage;
