import { View, Text } from 'react-native';
import React from 'react';
import useCommonStyles from '@/hooks/useCommonStyles';
import { TextStyled } from '../typography';

interface IProps {
  activeIndex: number;
  stepSize: number;
}

const WizardStepIndicator: React.FC<IProps> = ({ activeIndex, stepSize }) => {
  const commonStyles = useCommonStyles();
  return (
    <View style={[commonStyles.flexStyles.rowStart]}>
      <View>
        <TextStyled
          fontSize="lg"
          fontWeight="medium"
          customColor="grayScale900"
        >
          {activeIndex + 1}
        </TextStyled>
      </View>
      <View>
        <TextStyled
          fontSize="lg"
          fontWeight="medium"
          customColor="grayScale400"
        >
          {'/' + stepSize}
        </TextStyled>
      </View>
    </View>
  );
};

export default WizardStepIndicator;
