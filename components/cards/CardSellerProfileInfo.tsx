import { Animated, View } from 'react-native';
import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import { TextStyled } from '../typography';
import {
  useAddCurrentUserImageMutation,
  useGetCurrentUserInformationQuery,
  useGetCurrentUserListingsQuery,
} from '@/services/accountServices';
import ImageIconCircle from '../images/ImageIconCircle';
import dateUtils from '@/utils/dateUtils';
import { router } from 'expo-router';
import APP_ROUTES from '@/constants/APP_ROUTES';
import { ButtonStyled } from '../button';
import InputImageUploader from '../input/InputImageUploader';
import SvgAnimLoadingSpinner from '../svg/animation/SvgAnimLoadingSpinner';
import ImageUserProfile from '../images/ImageUserProfile';
import { useState } from 'react';

interface IProps {
  scrollY: Animated.Value;
}
const CardSellerProfileInfo: React.FC<IProps> = ({ scrollY }) => {
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const { theme } = useAppTheme();

  const [uploadProfileImage, { isLoading: uploadImageIsLoading }] =
    useAddCurrentUserImageMutation();

  const { data: currentUserListingData } = useGetCurrentUserListingsQuery();
  const { data: currentUserData } = useGetCurrentUserInformationQuery();

  const avatarSize = scrollY.interpolate({
    inputRange: [0, 150], // 0'dan 150 birim scrolle kadar
    outputRange: [APP_STYLE_VALUES.WH_SIZES.xl3, APP_STYLE_VALUES.WH_SIZES.xl],
    extrapolate: 'clamp', // Değerleri bu aralık dışında sınırla
  });

  const avatarPosition = scrollY.interpolate({
    inputRange: [0, 150], // 0'dan 150 birim scrolle kadar
    outputRange: [0, -120],
    extrapolate: 'clamp', // Değerleri bu aralık dışında sınırla
  });

  const avatarMargin = scrollY.interpolate({
    inputRange: [0, 150], // 0'dan 150 birim scrolle kadar
    outputRange: [
      -APP_STYLE_VALUES.WH_SIZES.xl2 / 2,
      APP_STYLE_VALUES.WH_SIZES.sm,
    ],
    extrapolate: 'clamp', // Değerleri bu aralık dışında sınırla
  });

  const uploadScale = scrollY.interpolate({
    inputRange: [0, 50], // 0'dan 150 birim scrolle kadar
    outputRange: [1, 0],
    extrapolate: 'clamp', // Değerleri bu aralık dışında sınırla
  });

  const cardSize = scrollY.interpolate({
    inputRange: [0, 150], // 0'dan 150 birim scrolle kadar
    outputRange: [APP_STYLE_VALUES.WH_SIZES.xl4, APP_STYLE_VALUES.WH_SIZES.xl2],
    extrapolate: 'clamp', // Değerleri bu aralık dışında sınırla
  });

  const cardMargin = scrollY.interpolate({
    inputRange: [0, 150], // 0'dan 150 birim scrolle kadar
    outputRange: [
      -APP_STYLE_VALUES.SPACE_SIZES.sp15,
      -APP_STYLE_VALUES.SPACE_SIZES.sp23,
    ],
    extrapolate: 'clamp', // Değerleri bu aralık dışında sınırla
  });

  const toggleAnimation = () => {
    if (isAnimationStarted) {
      // Elemanı tekrar göster
      setIsAnimationStarted(false); // DOM'a tekrar ekle
      Animated.timing(scrollY, {
        toValue: 0, // İlk duruma geri dön
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      // Elemanı gizle
      Animated.timing(scrollY, {
        toValue: 1, // Gizlenme durumuna geç
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsAnimationStarted(true)); // Animasyon sonunda gizle
    }
  };

  const handleImageUpload = async (selectedImages: any[]) => {
    const formDataForMedia = new FormData();

    const file = selectedImages[0];
    if (file) {
      formDataForMedia.append('file', file, file.name);
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
    <Animated.View
      style={[
        themedStyles.cardStyles.default,
        commonStyles.flexStyles.colCenter,
        {
          borderWidth: 0,
          height: cardSize,
          overflow: 'visible',
          width: '100%',
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
            overflow: 'visible',
            width: '100%',
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
                top: 'auto',
                left: APP_STYLE_VALUES.SPACE_SIZES.sp4,
                zIndex: 1,
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
                overflow: 'hidden',
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
                  size={APP_STYLE_VALUES.WH_SIZES.xl3}
                />
              </View>
            )}
            <ImageUserProfile
              url={currentUserData?.image}
              iconSize={APP_STYLE_VALUES.WH_SIZES.lg}
            />
          </Animated.View>
        </Animated.View>
      </Animated.View>

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
    </Animated.View>
  );
};

export default CardSellerProfileInfo;
