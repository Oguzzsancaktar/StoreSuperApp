import { ButtonStyled } from '@/components/button';
import CardPostCategory from '@/components/cards/CardPostCategory';
import CardSellerInfo from '@/components/cards/CardSellerInfo';
import { InnerCommonContainer } from '@/components/containers';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import ImageCover from '@/components/images/ImageCover';
import { getIconWithProps } from '@/components/svg/icon';
import IconBell from '@/components/svg/icon/IconBell';
import IconLocation from '@/components/svg/icon/IconLocation';
import IconSendMessage from '@/components/svg/icon/IconSendMessage';
import IconUser from '@/components/svg/icon/IconUser';
import { TextStyled } from '@/components/typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import useCommonStyles from '@/hooks/useCommonStyles';
import IUser from '@/interfaces/account/IUser';
import { useGetListingItemDetailsQuery } from '@/services/listingServices';
import { useLocalSearchParams } from 'expo-router';
import { find } from 'lodash';
import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';

const ListingDetailPage = () => {
  const commonStyles = useCommonStyles();
  const { theme } = useAppTheme();

  const { listingId } = useLocalSearchParams();

  const { data: listingItemDetailData, isLoading } =
    useGetListingItemDetailsQuery(listingId as string);

  console.log('listingItemDetailData', listingItemDetailData);

  const coverImageUrl = useMemo(() => {
    return (
      find(listingItemDetailData?.media, (med) => med.isCoverImage) ||
      listingItemDetailData?.media[0]
    )?.url;
  }, [listingItemDetailData]);

  if (isLoading) {
    return null;
  }

  return (
    <ScreenWrapperContainer showGoBack={true}>
      <InnerCommonContainer>
        <ScrollView
          contentContainerStyle={{ gap: APP_STYLE_VALUES.SPACE_SIZES.sp6 }}
        >
          <View
            style={[
              commonStyles.flexStyles.colStart,
              { width: '100%', gap: APP_STYLE_VALUES.SPACE_SIZES.sp4 },
            ]}
          >
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
                <View style={{ width: APP_STYLE_VALUES.WH_SIZES.xxs }}>
                  <IconLocation color={theme.grayScale400} />
                </View>

                <TextStyled
                  textAlignment="center"
                  fontSize="md"
                  fontWeight="bold"
                  customColor={'grayScale400'}
                >
                  {(listingItemDetailData?.listingAddress?.countryName || '') +
                    ', ' +
                    (listingItemDetailData?.listingAddress?.cityName + '')}
                </TextStyled>
              </View>
            </View>

            <View style={{ width: '100%', height: 200 }}>
              <ImageCover url={coverImageUrl} />
            </View>

            <View style={{ width: '100%' }}>
              <CardPostCategory
                categories={listingItemDetailData?.categories || []}
              />
            </View>

            <View style={{ gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 }}>
              <TextStyled fontSize="h4" fontWeight="bold" textAlignment="left">
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
              <CardSellerInfo
                user={listingItemDetailData?.user || ({} as IUser)}
              />
            </View>
          </View>
        </ScrollView>

        <View
          style={[
            commonStyles.flexStyles.rowWrap,
            {
              gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
              marginTop: APP_STYLE_VALUES.SPACE_SIZES.sp4,
            },
          ]}
        >
          <View>
            <ButtonStyled variant="buttonPrimaryOutlined">
              <IconUser color={theme.grayScale500} />
            </ButtonStyled>
          </View>

          {/* @todo add it to button compoennt for icon */}

          <View style={{ flex: 1 }}>
            <ButtonStyled variant="buttonPrimarySolid">
              <View
                style={[
                  commonStyles.flexStyles.rowCenterWrap,
                  { width: '100%', gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
                ]}
              >
                <View
                  style={[
                    commonStyles.flexStyles.rowStart,
                    { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
                  ]}
                >
                  <IconSendMessage color={theme.white} />

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
            </ButtonStyled>
          </View>
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default ListingDetailPage;
