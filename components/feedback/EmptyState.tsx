import { View, Text } from 'react-native';
import React from 'react';
import { InnerCommonContainer } from '../containers';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import useCommonStyles from '@/hooks/useCommonStyles';
import { TextStyled } from '../typography';
import SNoDataIllustration from '@/components/svg/illustrations/SNoDataIllustration';

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
          Currently no data found
        </TextStyled>

        <View
          style={{
            width: APP_STYLE_VALUES.WH_SIZES.xl10,
            height: APP_STYLE_VALUES.WH_SIZES.xl10,
          }}
        >
          <SNoDataIllustration />
        </View>
      </View>
    </InnerCommonContainer>
  );
};

export default EmptyState;
