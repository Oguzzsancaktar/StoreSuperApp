import useThemedStyles from '@/hooks/useThemedStyles';
import ISelectOption from '@/interfaces/theme/ISelectOption';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import { find, map } from 'lodash';
import { ButtonStyled } from '../button';
import { TextStyled } from '../typography';
import useCommonStyles from '@/hooks/useCommonStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { BlurView } from '@react-native-community/blur';
import { Dropdown } from 'react-native-element-dropdown';
import { useAppTheme } from '@/contexts/ThemeContext';
import APP_COMMONS from '@/constants/APP_COMMONS';
import { useGetListingCategoriesQuery } from '@/services/listingFilterServices';
import { useListingFilter } from '@/contexts/ListingFilterContext';
import APP_TYPOGRAPHY from '@/constants/APP_TYPOGRAPHY';
import InputSelectStyled from '../input/InputSelectStyled';

interface IProps {
  variant?: 'transparent' | 'primary';
  options: ISelectOption[];
  value: ISelectOption | undefined;
  onChange: (selected: ISelectOption) => void;
}

const FilterStuffType: React.FC<IProps> = ({
  options,
  onChange,
  value,
  variant = 'primary',
}) => {
  const { theme } = useAppTheme();
  const themedStyles = useThemedStyles();

  const handleSelect = (selectedItem: ISelectOption) => {
    onChange(selectedItem);
  };

  return (
    <View
      style={[
        {
          paddingHorizontal: 0,
          width: '100%',
        },
      ]}
    >
      <InputSelectStyled
        handleSelect={handleSelect}
        options={options}
        variant="transparent"
        value={value ?? options[0]}
      />
    </View>
  );
};

export default FilterStuffType;
