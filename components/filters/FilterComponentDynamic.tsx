import { View, Text } from 'react-native';
import React, { useMemo } from 'react';
import IListingCategoryOption from '@/interfaces/listing/IListingCategoryOption';
import { TextStyled } from '../typography';
import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import IListingFilterOption from '@/interfaces/listing/IListingFilterOption';

interface IProps {
  option: IListingFilterOption;
}

const FilterComponentDynamic: React.FC<IProps> = ({ option }) => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();

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
