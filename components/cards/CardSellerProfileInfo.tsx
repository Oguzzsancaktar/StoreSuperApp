import { View, Text } from 'react-native';
import React from 'react';
import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import ImageCover from '../images/ImageCover';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import { TextStyled } from '../typography';
import APP_ROUTES from '@/constants/APP_ROUTES';
import CardNewestPostings from './CardNewestPostings';

const CardSellerProfileInfo = () => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const { theme } = useAppTheme();
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
            height: APP_STYLE_VALUES.WH_SIZES.xl2,
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
              backgroundColor: 'blue',
              marginTop: -APP_STYLE_VALUES.WH_SIZES.xl2 / 2,
              borderColor: theme.grayScale100,
              width: APP_STYLE_VALUES.WH_SIZES.xl2,
              height: APP_STYLE_VALUES.WH_SIZES.xl2,
              borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.full,
            },
          ]}
        >
          <ImageCover />
        </View>
      </View>

      <View
        style={[
          commonStyles.flexStyles.colCenter,
          { marginTop: -APP_STYLE_VALUES.SPACE_SIZES.sp4 },
        ]}
      >
        <TextStyled fontSize="h6" fontWeight="semibold">
          Seller Name
        </TextStyled>
        <View style={[{ marginTop: -APP_STYLE_VALUES.SPACE_SIZES.sp1 }]}>
          <TextStyled fontSize="md" fontWeight="medium">
            @sellerUserName
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
            120
          </TextStyled>
        </View>

        <View style={[commonStyles.flexStyles.colCenter]}>
          <TextStyled fontSize="sm" fontWeight="semibold">
            Register Date
          </TextStyled>
          <TextStyled fontSize="xs" fontWeight="medium">
            13 Aug 2023
          </TextStyled>
        </View>

        <View style={[commonStyles.flexStyles.colCenter]}>
          <TextStyled fontSize="sm" fontWeight="semibold">
            Seller Type
          </TextStyled>
          <TextStyled fontSize="xs" fontWeight="medium">
            Business
          </TextStyled>
        </View>
      </View>
      <View style={[commonStyles.flexStyles.colCenter]}>
        <TextStyled fontSize="sm" fontWeight="medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
          expedita officia repellat! Placeat omnis nobis, vel dolorum fugiat
          perspiciatis eius.
        </TextStyled>
      </View>
    </View>
  );
};

export default CardSellerProfileInfo;
