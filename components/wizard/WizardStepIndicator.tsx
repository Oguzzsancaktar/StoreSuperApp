import React from "react";
import { View } from "react-native";

import useAppStyles from "@/hooks/useAppStyles";

import { TextStyled } from "../typography";

interface IProps {
  activeIndex: number;
  stepSize: number;
}

const WizardStepIndicator: React.FC<IProps> = ({ activeIndex, stepSize }) => {
  const { commonStyles } = useAppStyles();
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
          {"/" + stepSize}
        </TextStyled>
      </View>
    </View>
  );
};

export default WizardStepIndicator;
