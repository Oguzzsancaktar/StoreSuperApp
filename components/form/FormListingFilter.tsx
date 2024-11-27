import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, ViewStyle } from 'react-native';
import { useGetListingFiltersQuery } from '@/services/listingFilterServices';
import { useListingFilter } from '@/contexts/ListingFilterContext';
import { useAppTheme } from '@/contexts/ThemeContext';
import { map } from 'lodash';
import { FormStyled, FormWizard } from '.';
import { IFormWizardStepProps } from './FormWizard';
import useThemedStyles from '@/hooks/useThemedStyles';
import EListingFilterOptionComponentType from '@/interfaces/enums/EListingFilterOptionComponentType';
import { IInputProps } from '@/interfaces/app';

const FormListingFilter = () => {
  const { theme } = useAppTheme();
  const { selectedCategory } = useListingFilter();
  const themedStyles = useThemedStyles();
  const { data: filterOptionData } = useGetListingFiltersQuery(
    selectedCategory || '',
    {
      skip: !selectedCategory,
    }
  );

  const [values, setValues] = useState<Record<string, any>>({});

  console.log('values', values);

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

  const defaultValues = {};

  const handleSubmit = async (values: Record<string, any>) => {
    const {
      categoryId = '',
      allowMessaging = false,
      allowPhoneCalls = false,
      isActive = true,
      isDraft = true,
      city = {},
      country = {},
      district = {},
      fullAddress = '',
      showFullAddress = false,
      zipCode = '',
      tags = [],
      translations = [],
      currency = {},
      description = '',
      title = '',
      media = [],
      options = [],
      price = {},
      negotiable = false,
      coverImage = '',
      terms,
      estateType,
      ...others
    } = values || {};

    const keys = Object.keys(others);
  };

  console.log('filterOptionData', filterOptionData);
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
