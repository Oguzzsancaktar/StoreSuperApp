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
import { find } from 'lodash';
import { ButtonStyled } from '../button';
import { TextStyled } from '../typography';
import useCommonStyles from '@/hooks/useCommonStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { BlurView } from '@react-native-community/blur';
import { Dropdown } from 'react-native-element-dropdown';
import { useAppTheme } from '@/contexts/ThemeContext';

const APP_ADVERT_TYPE_OPTIONS: ISelectOption[] = [
  { label: 'Real Estate', value: 'realEstate' },
  { label: 'Car', value: 'car' },
  { label: 'Electronic', value: 'electronic' },
];

const FilterStuffType = () => {
  const { theme } = useAppTheme();
  const themedStyles = useThemedStyles();
  const commonStyles = useCommonStyles();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] =
    useState<ISelectOption['value']>('realEstate');

  const handleSelect = (selectedItem: ISelectOption) => {
    setSelectedValue(selectedItem.value);
    setIsVisible(false);
  };

  return (
    <View
      style={[
        themedStyles.buttonStyles.buttonPrimarySolid,
        { paddingHorizontal: 0, width: '100%' },
      ]}
    >
      <Dropdown
        style={{
          height: '100%',
          width: '100%',
          paddingHorizontal: APP_STYLE_VALUES.SPACE_SIZES.sp3,
        }}
        value={selectedValue}
        data={APP_ADVERT_TYPE_OPTIONS}
        labelField="label"
        valueField="value"
        iconColor={theme.white}
        containerStyle={[
          themedStyles.cardStyles.default,
          {
            padding: 0,
            paddingVertical: 0,
            backgroundColor: theme.grayScale100,
            width: 150,
          },
        ]}
        activeColor={theme.grayScale300}
        itemTextStyle={{ color: theme.grayScale900 }}
        fontFamily="BRShapeMedium"
        selectedTextStyle={{ color: theme.white }}
        onChange={handleSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    width: 200,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default FilterStuffType;
