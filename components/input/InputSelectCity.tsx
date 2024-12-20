import { useMemo } from "react";

import { map } from "lodash";

import ICountry from "@/interfaces/common/address/ICountry";
import ISelectOption from "@/interfaces/theme/ISelectOption";
import { useGetCitiesQuery } from "@/services/listingFilterServices";

import InputSelectStyled from "./InputSelectStyled";

interface IProps {
  countryId: ICountry["id"];
  value?: ISelectOption;
  handleSelect(selected: ISelectOption): void;
}
const InputSelectCity: React.FC<IProps> = ({
  countryId,
  handleSelect,
  value,
}) => {
  const { data: citiesData } = useGetCitiesQuery(countryId);

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
      showReset={true}
      searchable={true}
      label="Cities"
      variant="gray200Outlined"
      options={cityOptions}
      handleSelect={handleSelect}
      value={value}
    />
  );
};

export default InputSelectCity;
