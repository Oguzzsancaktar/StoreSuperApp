import { View, Text } from 'react-native';
import React from 'react';
import TextStyled from '@/components/typography/TextStyled';
import { ScanTextPattern } from '../svg/background';
import useCommonStyles from '@/hooks/useCommonStyles';

const TextScanEffect = () => {
  const commonStyles = useCommonStyles();

  return (
    <View
      style={[
        commonStyles.flexStyles.selfCenter,
        commonStyles.maxWidthStyles.maxWidthSm,
        commonStyles.spacingStyles.p1,
        { paddingVertical: 0 },
      ]}
    >
      <TextStyled fontSize="xl" fontWeight="regular" customColor="grayScale600">
        STORE
      </TextStyled>
      <View
        style={[
          commonStyles.absolutePositionStyles.absoluteFill,
          commonStyles.flexStyles.flexCenter,
        ]}
      >
        <ScanTextPattern />
      </View>
    </View>
  );
};

export default TextScanEffect;
