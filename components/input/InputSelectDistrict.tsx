import InputSelectStyled from './InputSelectStyled';
import {
  useGetCitiesQuery,
  useGetDistrictsQuery,
} from '@/services/listingFilterServices';
import ISelectOption from '@/interfaces/theme/ISelectOption';
import { useMemo } from 'react';
import { map } from 'lodash';
import ICity from '@/interfaces/common/address/ICity';

interface IProps {
  cityId: ICity['id'];
  value?: ISelectOption;
  handleSelect(selected: ISelectOption): void;
}
const InputSelectDistrict: React.FC<IProps> = ({
  cityId,
  handleSelect,
  value,
}) => {
  const { data: districtData } = useGetDistrictsQuery(cityId);

  const districtOptions: ISelectOption[] = useMemo(() => {
    return map(districtData, (c) => {
      return {
        label: c.name,
        value: c.id,
      };
    });
  }, [districtData]);

  return (
    <InputSelectStyled
      label="Districts"
      variant="transparent"
      options={districtOptions}
      handleSelect={handleSelect}
      value={value}
    />
  );
};

export default InputSelectDistrict;
