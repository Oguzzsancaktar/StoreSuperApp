import { View } from 'react-native';
import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import ImageStyled from '../images/ImageStyled';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import { TextStyled } from '../typography';
import {
  useAddCurrentUserImageMutation,
  useGetCurrentUserInformationQuery,
  useGetCurrentUserListingsQuery,
} from '@/services/accountServices';
import ImageIconCircle from '../images/ImageIconCircle';
import IconUser from '../svg/icon/IconUser';
import dateUtils from '@/utils/dateUtils';
import { router } from 'expo-router';
import APP_ROUTES from '@/constants/APP_ROUTES';
import { ButtonStyled } from '../button';
import InputImageUploader from '../input/InputImageUploader';
import SvgAnimLoadingSpinner from '../svg/animation/SvgAnimLoadingSpinner';

const CardSellerProfileInfo = () => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const { theme } = useAppTheme();

  const { data: currentUserListingData } = useGetCurrentUserListingsQuery();
  const { data: currentUserData } = useGetCurrentUserInformationQuery();

  const [uploadProfileImage, { isLoading: uploadImageIsLoading }] =
    useAddCurrentUserImageMutation();

  const handleImageUpload = async (selectedImages: any[]) => {
    const formDataForMedia = new FormData();

    const file = selectedImages[0];
    if (file) {
      formDataForMedia.append('file', file, file.name); // `files` API'deki alan adıyla eşleşmeli
    }

    try {
      const uploadedMediaUrls = await uploadProfileImage(
        formDataForMedia as any
      ).unwrap();

      console.log('uploadedMediaUrls', uploadedMediaUrls);
    } catch (err) {
      console.log('err', err);
    }
  };

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
              marginTop: -APP_STYLE_VALUES.WH_SIZES.xl3 / 2,
            },
          ]}
        >
          <View
            style={[
              commonStyles.absolutePositionStyles.absoluteFill,
              {
                top: 'auto',
                left: APP_STYLE_VALUES.SPACE_SIZES.sp4,
                zIndex: 1,
                width: APP_STYLE_VALUES.WH_SIZES.xs,
                height: APP_STYLE_VALUES.WH_SIZES.xs,
              },
            ]}
          >
            <InputImageUploader
              isUploadButton={true}
              maxMedia={1}
              onChange={handleImageUpload}
            />
          </View>

          <View
            style={[
              {
                overflow: 'hidden',
                borderColor: theme.grayScale100,
                width: APP_STYLE_VALUES.WH_SIZES.xl3,
                height: APP_STYLE_VALUES.WH_SIZES.xl3,
                borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.full,
              },
            ]}
          >
            {uploadImageIsLoading && (
              <View
                style={[
                  commonStyles.absolutePositionStyles.absoluteFill,
                  { zIndex: 1 },
                ]}
              >
                <ImageIconCircle
                  icon={<SvgAnimLoadingSpinner color={theme.white} />}
                  size={APP_STYLE_VALUES.WH_SIZES.xl3}
                />
              </View>
            )}

            {currentUserData?.image ? (
              <ImageStyled url={currentUserData.image} />
            ) : (
              <ImageIconCircle
                icon={
                  <IconUser
                    width={APP_STYLE_VALUES.WH_SIZES.lg}
                    height={APP_STYLE_VALUES.WH_SIZES.lg}
                    color={theme.white}
                  />
                }
                size={APP_STYLE_VALUES.WH_SIZES.xl3}
              />
            )}
          </View>
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
                  'DATE_MOMENT_NAME'
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
        <View style={{ width: '100%', gap: APP_STYLE_VALUES.SPACE_SIZES.sp4 }}>
          <TextStyled fontSize="h4" fontWeight="bold">
            Sign in to see profile
          </TextStyled>

          <ButtonStyled
            onPress={() => {
              router.push(APP_ROUTES.PUBLIC.LOGIN);
            }}
            text={'Login'}
            variant="buttonPrimaryOutlined"
            gradientBg
          />
        </View>
      )}
    </View>
  );
};

export default CardSellerProfileInfo;
