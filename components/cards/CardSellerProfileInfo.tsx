import { View } from 'react-native';
import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import ImageStyled from '../images/ImageStyled';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import { TextStyled } from '../typography';
import {
  useGetCurrentUserInformationQuery,
  useGetCurrentUserListingsQuery,
} from '@/services/accountServices';
import ImageIconCircle from '../images/ImageIconCircle';
import IconUser from '../svg/icon/IconUser';
import dateUtils from '@/utils/dateUtils';

const CardSellerProfileInfo = () => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const { theme } = useAppTheme();

  const { data: currentUserListingData } = useGetCurrentUserListingsQuery();

  const { data: currentUserData } = useGetCurrentUserInformationQuery();

  return (
    <View
      style={[
        themedStyles.cardStyles.default,
        commonStyles.flexStyles.colCenter,
        {
          borderWidth: 0,
          overflow: 'visible',
          width: '100%',
          marginTop: -APP_STYLE_VALUES.SPACE_SIZES.sp15,
        },
      ]}
    >
      <View
        style={[
          commonStyles.flexStyles.colCenter,
          {
            marginTop: -APP_STYLE_VALUES.SPACE_SIZES.sp10,
            height: APP_STYLE_VALUES.WH_SIZES.xl3,
            overflow: 'visible',
            width: '100%',
          },
        ]}
      >
        <View
          style={[
            {
              borderWidth: 1,
              overflow: 'hidden',
              marginTop: -APP_STYLE_VALUES.WH_SIZES.xl3 / 2,
              borderColor: theme.grayScale100,
              width: APP_STYLE_VALUES.WH_SIZES.xl3,
              height: APP_STYLE_VALUES.WH_SIZES.xl3,
              borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.full,
            },
          ]}
        >
          {currentUserData?.image ? (
            <ImageStyled url={currentUserData.image} />
          ) : (
            <ImageIconCircle
              icon={
                <IconUser
                  width={APP_STYLE_VALUES.WH_SIZES.lg}
                  height={APP_STYLE_VALUES.WH_SIZES.lg}
                  color={theme.grayScale900}
                />
              }
              size={APP_STYLE_VALUES.WH_SIZES.xl3}
            />
          )}
        </View>
      </View>

      {currentUserData ? (
        <>
          <View
            style={[
              commonStyles.flexStyles.colCenter,
              {
                marginTop: -APP_STYLE_VALUES.SPACE_SIZES.sp4,
              },
            ]}
          >
            <View>
              <TextStyled fontSize="h6" fontWeight="semibold">
                {currentUserData?.firstName || ''}{' '}
                {currentUserData?.lastName || ''}
              </TextStyled>
            </View>
            <View style={[{ marginTop: -APP_STYLE_VALUES.SPACE_SIZES.sp1 }]}>
              <TextStyled fontSize="md" fontWeight="medium">
                {currentUserData.email.toLowerCase()}
              </TextStyled>
            </View>
          </View>

          <View
            style={[
              commonStyles.flexStyles.rowBetween,
              {
                gap: APP_STYLE_VALUES.SPACE_SIZES.sp4,
                marginVertical: APP_STYLE_VALUES.SPACE_SIZES.sp4,
              },
            ]}
          >
            <View style={[commonStyles.flexStyles.colCenter]}>
              <TextStyled fontSize="sm" fontWeight="semibold">
                Post Count
              </TextStyled>
              <TextStyled fontSize="xs" fontWeight="medium">
                {currentUserListingData?.length?.toString() || ''}
              </TextStyled>
            </View>

            <View style={[commonStyles.flexStyles.colCenter]}>
              <TextStyled fontSize="sm" fontWeight="semibold">
                Register Date
              </TextStyled>
              <TextStyled fontSize="xs" fontWeight="medium">
                {dateUtils.formatDateForMoment(
                  currentUserData.created,
                  'DATE_NAME_MOMENT'
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
          </View>
          <View
            style={[
              commonStyles.flexStyles.colCenter,
              { flex: 1, width: '100%' },
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
        <View>
          <TextStyled fontSize="h3" fontWeight="bold">
            Login For Information
          </TextStyled>
        </View>
      )}
    </View>
  );
};

export default CardSellerProfileInfo;
