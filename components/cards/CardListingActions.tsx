import { View, Text } from 'react-native';
import React from 'react';
import useCommonStyles from '@/hooks/useCommonStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import ImageIconCircle from '../images/ImageIconCircle';
import IconHeartFilled from '../svg/icon/filled/IconHeartFilled';
import { useAppTheme } from '@/contexts/ThemeContext';
import IconShare from '../svg/icon/IconShare';

const CardListingActions = () => {
  const { theme } = useAppTheme();
  const commonStyles = useCommonStyles();
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
        bgColor="transparent"
        size={APP_STYLE_VALUES.WH_SIZES.xs}
        icon={
          <IconHeartFilled
            width={APP_STYLE_VALUES.WH_SIZES.xs2}
            height={APP_STYLE_VALUES.WH_SIZES.xs2}
            color={theme.primary}
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
            color={theme.grayScale800}
          />
        }
      />
    </View>
  );
};

export default CardListingActions;
