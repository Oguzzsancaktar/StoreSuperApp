import { useMemo } from "react";

import { map } from "lodash";

import ISelectOption from "@/interfaces/theme/ISelectOption";
import { useGetCountriesQuery } from "@/services/listingFilterServices";

import InputSelectStyled from "./InputSelectStyled";

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
      showReset={true}
      searchable={true}
      label="Countries"
      variant="gray200Outlined"
      options={countryOptions}
      value={value}
      handleSelect={handleSelect}
    />
  );
};

export default InputSelectCountry;
