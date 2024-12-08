import { View, Text } from 'react-native';
import React from 'react';
import { InnerCommonContainer } from '../containers';
import ImageStyled from '../images/ImageStyled';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import useCommonStyles from '@/hooks/useCommonStyles';
import { TextStyled } from '../typography';

const EmptyState = () => {
  const commonStyles = useCommonStyles();
  return (
    <InnerCommonContainer>
      <View
        style={[
          commonStyles.flexStyles.colCenter,
          {
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp6,
            height: '100%',
          },
        ]}
      >
        <TextStyled fontSize="h6" customColor="primary" fontWeight="bold">
          This List İs Emty
        </TextStyled>
        <ImageStyled
          height={APP_STYLE_VALUES.WH_SIZES.xl3}
          imageId="LISTING_ESTATE_DEFAULT"
        />
      </View>
    </InnerCommonContainer>
  );
};

export default EmptyState;
