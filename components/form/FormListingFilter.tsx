import React, { useMemo, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useGetListingFiltersQuery } from '@/services/listingFilterServices';
import { useListingFilter } from '@/contexts/ListingFilterContext';
import { map } from 'lodash';
import { FormWizard } from '.';
import { IFormWizardStepProps } from './FormWizard';
import EListingFilterOptionComponentType from '@/interfaces/enums/EListingFilterOptionComponentType';
import { IInputProps } from '@/interfaces/app';
import { useDrawerState } from '@/contexts/DrawerContext';

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

  const steps: IFormWizardStepProps[] = useMemo(
    () => [
      {
        id: 'filter',
        fields: map(filterOptionData, (filter) => {
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
        }) as IFormWizardStepProps['fields'],
      },
    ],
    [filterOptionData]
  );

  const defaultValues = { ...filterValues };

  const handleSubmit = async (values: Record<string, any>) => {
    setFilterValues({ ...filterValues, ...values });
    toggleDrawer();
  };

  // @todo create custom scrollwiev
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
      }}
      onStartShouldSetResponder={() => true}
    >
      <ScrollView
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <FormWizard
          values={values}
          setValues={setValues}
          steps={steps}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        />
      </ScrollView>
    </View>
  );
};

export default FormListingFilter;
