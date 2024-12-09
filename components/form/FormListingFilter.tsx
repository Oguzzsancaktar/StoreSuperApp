import React, { useMemo, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useGetListingFiltersQuery } from '@/services/listingFilterServices';
import { useListingFilter } from '@/contexts/ListingFilterContext';
import { map } from 'lodash';
import { FormStyled, FormWizard } from '.';
import { IFormWizardStepProps } from './FormWizard';
import EListingFilterOptionComponentType from '@/interfaces/enums/EListingFilterOptionComponentType';
import { IInputProps } from '@/interfaces/app';
import { useDrawerState } from '@/contexts/DrawerContext';
import ScrollViewStyled from '../override/ScrollViewStyled';
import { InnerCommonContainer } from '../containers';

const FormListingFilter = () => {
  const { filterValues, setFilterValues } = useListingFilter();

  const { isDrawerOpen, toggleDrawer } = useDrawerState();

  console.log('filterValues', filterValues);
  const { data: filterOptionData } = useGetListingFiltersQuery(
    filterValues.category || '',
    {
      skip: !filterValues.category,
    }
  );

  const [values, setValues] = useState<Record<string, any>>(filterValues);

  const fields: Array<IInputProps> = useMemo(
    () => [
      ...(map(filterOptionData, (filter) => {
        return {
          label: filter.name,
          name: filter.propertyName,
          required: false,
          type: EListingFilterOptionComponentType[filter.filterType],
          placeholder: filter.placeholder,
          options: map(filter.values, (val) => {
            return {
              value: val.value,
              label: val.name,
            };
          }),
        } as IInputProps;
      }) as IFormWizardStepProps['fields']),
    ],
    [filterOptionData]
  );

  const defaultValues = { ...filterValues };

  const handleSubmit = async (values: Record<string, any>) => {
    setFilterValues({ ...filterValues, ...values });
    toggleDrawer();
  };

  return (
    <InnerCommonContainer>
      <FormStyled
        fields={fields}
        submitKey="Apply"
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
      />
    </InnerCommonContainer>
  );
};

export default FormListingFilter;
