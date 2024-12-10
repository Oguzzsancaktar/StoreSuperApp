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

const APP_ADVERT_TYPE_OPTIONS: ISelectOption[] = [
  { label: 'Real Estate', value: 'realEstate' },
  { label: 'Car', value: 'car' },
  { label: 'Electronic', value: 'electronic' },
];

const FilterModalStuffType = () => {
  const themedStyles = useThemedStyles();
  const commonStyles = useCommonStyles();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] =
    useState<ISelectOption['value']>('realEstate');

  const handleSelect = (selectedItem: ISelectOption) => {
    setSelectedValue(selectedItem.value);
    setIsVisible(false);
  };

  <Dropdown
    data={APP_ADVERT_TYPE_OPTIONS}
    labelField="label"
    valueField="value"
    onChange={handleSelect}
  />;

  return (
    <View style={{ flex: 1 }}>
      <ButtonStyled
        text={
          'in ' +
          (find(APP_ADVERT_TYPE_OPTIONS, (v) => v.value === selectedValue)
            ?.label || '')
        }
        variant="primarySolid"
        onPress={() => setIsVisible(true)}
      />

      {/* Dropdown Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        {/* Blur Overlay */}
        <BlurView
          style={commonStyles.absolutePositionStyles.absoluteFill}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />

        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setIsVisible(false)}
        >
          <View style={[themedStyles.cardStyles.default, styles.dropdown]}>
            <FlatList
              data={APP_ADVERT_TYPE_OPTIONS}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    themedStyles.borderStyles.bottomUnderline,
                    { padding: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <TextStyled fontSize="md" fontWeight="medium">
                    {item.label}
                  </TextStyled>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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

export default FilterModalStuffType;
