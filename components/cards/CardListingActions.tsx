import { View, Text } from 'react-native';
import React from 'react';
import useCommonStyles from '@/hooks/useCommonStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import ImageIconCircle from '../images/ImageIconCircle';
import IconHeartFilled from '../svg/icon/filled/IconHeartFilled';
import { useAppTheme } from '@/contexts/ThemeContext';
import IconShare from '../svg/icon/IconShare';
import {
  useAddListingFavoriteMutation,
  useRemoveListingFavoriteMutation,
} from '@/services/listingServices';
import IListingPost from '@/interfaces/listing/IListingPost';

interface IProps {
  listingId: IListingPost['id'];
  isFavorite: boolean;
}
const CardListingActions: React.FC<IProps> = ({ isFavorite, listingId }) => {
  const { theme } = useAppTheme();
  const commonStyles = useCommonStyles();

  const [addFavorite] = useAddListingFavoriteMutation();
  const [deleteFavorite] = useRemoveListingFavoriteMutation();
  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        const result = await deleteFavorite({ id: listingId });
      } else {
        const result = await addFavorite({ listingId });
      }
    } catch (error) {
      console.log('err addToFavorite', error);
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
      <ImageIconCircle
        onPress={handleFavorite}
        bgColor="transparent"
        size={APP_STYLE_VALUES.WH_SIZES.xs}
        icon={
          <IconHeartFilled
            width={APP_STYLE_VALUES.WH_SIZES.xs2}
            height={APP_STYLE_VALUES.WH_SIZES.xs2}
            color={isFavorite ? theme.primary : theme.grayScale500}
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
          color={theme.grayScale800}
        />
      }
    /> */}
      <ImageIconCircle
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
