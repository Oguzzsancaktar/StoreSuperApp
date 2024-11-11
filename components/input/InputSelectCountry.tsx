import InputSelectStyled from './InputSelectStyled';
import { useGetCountriesQuery } from '@/services/listingFilterServices';
import ISelectOption from '@/interfaces/theme/ISelectOption';
import { useMemo } from 'react';
import { map } from 'lodash';

interface IProps {
  value?: ISelectOption;
  handleSelect(selected: ISelectOption): void;
}

const InputSelectCountry: React.FC<IProps> = ({ handleSelect, value }) => {
  const { data: countriesData } = useGetCountriesQuery();

  const countryOptions: ISelectOption[] = useMemo(() => {
    return map(countriesData, (c) => {
      return {
        label: c.name,
        value: c.id,
      };
    });
  }, [countriesData]);

  return (
    <InputSelectStyled
      label="Countries"
      variant="transparent"
      options={countryOptions}
      value={value}
      handleSelect={handleSelect}
    />
  );
};

export default InputSelectCountry;
