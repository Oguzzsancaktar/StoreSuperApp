import ImageIconCircle from '../images/ImageIconCircle';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import IconOptions from '../svg/icon/IconOptions';
import { useAppTheme } from '@/contexts/ThemeContext';
import ISelectOption from '@/interfaces/theme/ISelectOption';
import InputSelectStyled from '../input/InputSelectStyled';
import { View } from 'react-native';

const data = [
  { label: 'Visit Profile', value: 'profile' },
  { label: 'Delete Listing', value: 'delete' },
  { label: 'Edit Listing', value: 'edit' },
];

const ButtonListingActionDropdown = () => {
  const { theme } = useAppTheme();
  const handleSelect = (item: ISelectOption) => {
    switch (item.value) {
      case 'profile':
        alert('Profile ');
        break;
      case 'delete':
        alert('delete');
        break;
      case 'edit':
        alert('Paylaş');
        break;

      default:
        break;
    }
  };

  return (
    <View style={{ width: APP_STYLE_VALUES.WH_SIZES.md }}>
      <InputSelectStyled
        renderRightIcon={() => (
          <ImageIconCircle
            bgColor="transparent"
            size={APP_STYLE_VALUES.WH_SIZES.xs}
            icon={
              <IconOptions
                width={APP_STYLE_VALUES.WH_SIZES.xs2}
                height={APP_STYLE_VALUES.WH_SIZES.xs2}
                color={theme.grayScale500}
              />
            }
          />
        )}
        containerStyle={{ width: 200 }}
        options={data}
        handleSelect={handleSelect}
        variant="transparent"
      />
    </View>
  );
};
export default ButtonListingActionDropdown;
