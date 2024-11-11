import InputSelectStyled from './InputSelectStyled';
import { useGetCitiesQuery } from '@/services/listingFilterServices';
import ISelectOption from '@/interfaces/theme/ISelectOption';
import { useMemo } from 'react';
import { map } from 'lodash';
import ICountry from '@/interfaces/common/address/ICountry';

interface IProps {
  countryId: ICountry['id'];
  value?: ISelectOption;
  handleSelect(selected: ISelectOption): void;
}
const InputSelectCity: React.FC<IProps> = ({
  countryId,
  handleSelect,
  value,
}) => {
  const { data: citiesData } = useGetCitiesQuery(countryId);
  console.log('countryId', citiesData, countryId);

  const cityOptions: ISelectOption[] = useMemo(() => {
    return map(citiesData, (c) => {
      return {
        label: c.name,
        value: c.id,
      };
    });
  }, [citiesData]);

  return (
    <InputSelectStyled
      label="Cities"
      variant="transparent"
      options={cityOptions}
      handleSelect={handleSelect}
      value={value}
    />
  );
};

export default InputSelectCity;
