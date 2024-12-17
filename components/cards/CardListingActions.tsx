import { View, Text, Platform, Share } from 'react-native';
import React, { useMemo } from 'react';
import useCommonStyles from '@/hooks/useCommonStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import ImageIconCircle from '../images/ImageIconCircle';
import IconHeartFilled from '../svg/icon/filled/IconHeartFilled';
import { useAppTheme } from '@/contexts/ThemeContext';
import IconShare from '../svg/icon/IconShare';
import {
  useAddListingFavoriteMutation,
  useGetViewCountQuery,
  useRemoveListingFavoriteMutation,
} from '@/services/listingServices';
import IListingPost from '@/interfaces/listing/IListingPost';
import { useSession } from '@/contexts/AuthContext';
import { toastWarning } from '@/utils/toastUtils';
import IconEyeShowFilled from '../svg/icon/filled/IconEyeShowFilled';
import { TextStyled } from '../typography';
import useThemedStyles from '@/hooks/useThemedStyles';
import ButtonListingActionDropdown from '../button/ButtonListingActionDropdown';
import jwtUtils from '@/utils/jwtUtils';

interface IProps {
  post: IListingPost;
  showViewCount?: boolean;
}
const CardListingActions: React.FC<IProps> = ({
  post,
  showViewCount = false,
}) => {
  const { session } = useSession();
  const { theme } = useAppTheme();
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();

  const userTokenInfo = useMemo(() => {
    const info = session ? jwtUtils.userJwtDecode(session) : undefined;
    return info;
  }, [session]);

  const { data: postViewData } = useGetViewCountQuery(post?.id as string);

  const [addFavorite] = useAddListingFavoriteMutation();
  const [deleteFavorite] = useRemoveListingFavoriteMutation();

  const handleFavorite = async () => {
    try {
      if (!session) {
        toastWarning('Login For Favorite');
        return;
      }

      if (post?.isFavorite) {
        const result = await deleteFavorite({ id: post?.id });
      } else {
        const result = await addFavorite({ listingId: post?.id });
      }
    } catch (error) {
      console.log('err addToFavorite', error);
    }
  };

  const handleSharePlatformSpecific = async () => {
    try {
      const result = await Share.share({
        message: post?.name,
        url: 'https://setuka24.com/listing-details/' + post?.id,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Belirli bir aktivite türüyle paylaşıldı
          console.log('Paylaşılan aktivite türü:', result.activityType);
        } else {
          // Paylaşım başarılı
          console.log('İçerik başarıyla paylaşıldı.');
        }
      } else if (result.action === Share.dismissedAction) {
        // Paylaşım iptal edildi
        console.log('Paylaşım iptal edildi.');
      }
    } catch (error) {
      console.error('Paylaşım sırasında bir hata oluştu:', error);
    }
  };

  return (
    <View
      style={[
        commonStyles.flexStyles.rowEnd,
        {
          gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
        },
      ]}
    >
      {showViewCount && (
        <View
          style={[
            commonStyles.flexStyles.rowStart,
            themedStyles.borderStyles.rightSeperator,
            {
              gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
              paddingRight: APP_STYLE_VALUES.SPACE_SIZES.sp3,
            },
          ]}
        >
          <View
            style={[
              commonStyles.flexStyles.rowStart,
              { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
            ]}
          >
            <IconEyeShowFilled color={theme.grayScale400} />
            <View>
              <TextStyled
                fontSize="md"
                fontWeight="medium"
                customColor="grayScale900"
              >
                {postViewData || ''}
              </TextStyled>
            </View>
          </View>
          <View
            style={[
              commonStyles.flexStyles.rowStart,
              { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
            ]}
          >
            <IconHeartFilled
              width={APP_STYLE_VALUES.WH_SIZES.xs3}
              height={APP_STYLE_VALUES.WH_SIZES.xs3}
              color={theme.grayScale400}
            />
            <View>
              <TextStyled
                fontSize="md"
                fontWeight="medium"
                customColor="grayScale900"
              >
                {post?.favoriteCount}
              </TextStyled>
            </View>
          </View>
        </View>
      )}

      {post?.user?.email === userTokenInfo?.Email && (
        <ButtonListingActionDropdown post={post} />
      )}

      <ImageIconCircle
        onPress={handleFavorite}
        bgColor="transparent"
        size={APP_STYLE_VALUES.WH_SIZES.xs}
        icon={
          <IconHeartFilled
            width={APP_STYLE_VALUES.WH_SIZES.xs2}
            height={APP_STYLE_VALUES.WH_SIZES.xs2}
            color={post?.isFavorite ? theme.primary : theme.grayScale500}
          />
        }
      />
      {/* <ImageIconCircle
      bgColor="transparent"
      size={APP_STYLE_VALUES.WH_SIZES.xs}
      icon={
        <IconBookmark
          width={APP_STYLE_VALUES.WH_SIZES.xs2}
          height={APP_STYLE_VALUES.WH_SIZES.xs2}
          color={theme.grayScale500}
        />
      }
    /> */}
      <ImageIconCircle
        onPress={handleSharePlatformSpecific}
        bgColor="transparent"
        size={APP_STYLE_VALUES.WH_SIZES.xs}
        icon={
          <IconShare
            width={APP_STYLE_VALUES.WH_SIZES.xs2}
            height={APP_STYLE_VALUES.WH_SIZES.xs2}
            color={theme.grayScale500}
          />
        }
      />
    </View>
  );
};

export default CardListingActions;
