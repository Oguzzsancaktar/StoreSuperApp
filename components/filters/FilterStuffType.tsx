import ISelectOption from '@/interfaces/theme/ISelectOption';
import { View } from 'react-native';
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
