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
        variant === 'transparent'
          ? themedStyles.buttonStyles.badgeOutlined
          : themedStyles.buttonStyles.buttonPrimarySolid,
        {
          paddingHorizontal: 0,
          width: '100%',
        },
      ]}
    >
      <Dropdown
        style={{
          height: '100%',
          width: '100%',
          paddingHorizontal: APP_STYLE_VALUES.SPACE_SIZES.sp3,
        }}
        value={value ?? options[0]}
        data={options}
        labelField="label"
        valueField="value"
        iconColor={variant === 'transparent' ? theme.primary : theme.white}
        containerStyle={[
          themedStyles.cardStyles.default,
          {
            padding: 0,
            paddingVertical: 0,
            backgroundColor: theme.grayScale100,
            width: APP_STYLE_VALUES.WH_SIZES.xl3,
          },
        ]}
        activeColor={theme.grayScale300}
        itemTextStyle={{ color: theme.grayScale900 }}
        fontFamily="BRShapeMedium"
        selectedTextStyle={{
          color: variant === 'transparent' ? theme.primary : theme.white,
        }}
        onChange={handleSelect}
      />
    </View>
  );
};

export default FilterStuffType;
