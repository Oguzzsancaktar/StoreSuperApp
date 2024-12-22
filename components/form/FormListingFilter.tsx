import { useMemo } from "react";

import { map } from "lodash";

import { useDrawerState } from "@/contexts/DrawerContext";
import { useListingFilter } from "@/contexts/ListingFilterContext";
import { IInputProps } from "@/interfaces/app";
import EListingFilterOptionComponentType from "@/interfaces/enums/EListingFilterOptionComponentType";
import { useGetListingFiltersQuery } from "@/services/listingFilterServices";

import { FormStyled } from ".";
import { InnerCommonContainer } from "../containers";
import Preloader from "../feedback/Preloader";
import { IFormWizardStepProps } from "./FormWizard";

const FormListingFilter = () => {
  const { toggleDrawer } = useDrawerState();
  const { filterValues, setFilterValues } = useListingFilter();

  const { data: filterOptionData, isLoading: filterOptionsDataIsLoading } =
    useGetListingFiltersQuery(
      {
        categoryId: filterValues?.category,
        countryId: filterValues?.country?.value,
        cityId: filterValues?.city?.value,
        subCategory: filterValues?.subCategoryIds?.value,
      },
      {
        skip: !filterValues.category,
      },
    );

  const fields: Array<IInputProps> = useMemo(
    () => [
      ...(map(filterOptionData, (filter) => {
        return {
          label: filter.name,
          name: filter.propertyName,
          required: false,
          type: EListingFilterOptionComponentType[filter.filterType],
          placeholder: filter.placeholder,
          showReset: true,
          searchable: true,
          options: map(filter.values, (val) => {
            return {
              value: val.value,
              label: val.name,
            };
          }),
        } as IInputProps;
      }) as IFormWizardStepProps["fields"]),
    ],
    [filterOptionData, filterValues],
  );

  const handleSubmit = (values: Record<string, any>) => {
    // reset state
    if (Object.keys(values).length === 0) {
      setFilterValues({ category: filterValues?.category });
    } else {
      setFilterValues({ ...filterValues, ...values });
    }
    toggleDrawer();
  };

  if (filterOptionsDataIsLoading) {
    return <Preloader />;
  }

  return (
    <InnerCommonContainer>
      <FormStyled
        values={filterValues}
        showReset={true}
        fields={fields}
        submitKey="Apply"
        setValues={setFilterValues}
        onSubmit={handleSubmit}
      />
    </InnerCommonContainer>
  );
};

export default FormListingFilter;
