import ISelectOption from '@/interfaces/theme/ISelectOption';
import { View } from 'react-native';
import InputSelectStyled from '../input/InputSelectStyled';
import { IButtonStylesheet } from '@/interfaces/theme';

interface IProps {
  variant?: keyof IButtonStylesheet;
  options: ISelectOption[];
  value: ISelectOption | undefined;
  onChange: (selected: ISelectOption) => void;
}

const FilterStuffType: React.FC<IProps> = ({
  options,
  onChange,
  value,
  variant = 'primarySolid',
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
        placeholder="All"
        handleSelect={handleSelect}
        options={options}
        variant={variant}
        value={value ?? undefined}
      />
    </View>
  );
};

export default FilterStuffType;
