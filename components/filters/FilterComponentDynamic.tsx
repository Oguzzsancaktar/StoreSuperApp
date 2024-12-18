import React, { useMemo } from "react";
import { View } from "react-native";

import useAppStyles from "@/hooks/useAppStyles";
import IListingFilterOption from "@/interfaces/listing/IListingFilterOption";

import { TextStyled } from "../typography";

interface IProps {
  option: IListingFilterOption;
}

const FilterComponentDynamic: React.FC<IProps> = ({ option }) => {
  const { themedStyles } = useAppStyles();

  const DynamicComponent = useMemo(() => {
    let component = (
      <TextStyled fontSize="h4" fontWeight="medium">
        Component not found {option.propertyName}
      </TextStyled>
    );

    switch (option.filterType) {
      case 1:
        break;

      default:
        break;
    }
    return component;
  }, [option]);

  return (
    <View style={[themedStyles.cardStyles.default]}>{DynamicComponent}</View>
  );
};

export default FilterComponentDynamic;
