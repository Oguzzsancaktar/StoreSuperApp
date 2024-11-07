import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { InnerCommonContainer } from '@/components/containers';
import useCommonStyles from '@/hooks/useCommonStyles';
import { FormWizard } from '@/components/form';
import { IFormWizardStepProps } from '@/components/form/FormWizard';
import { TextStyled } from '@/components/typography';
import { View } from 'react-native';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import CardListingCategories from '@/components/cards/listing/CardListingCategories';
import { useState } from 'react';
import IListingCategory from '@/interfaces/listing/IListingCategory';

const WizardListingCreate = () => {
  const [values, setValues] = useState<Record<string, any>>({});

  const handleCategorySelect = (categoryId: IListingCategory['id']) => {
    setValues((prev) => {
      return { ...prev, categoryId };
    });
  };

  const steps: IFormWizardStepProps[] = [
    {
      id: 'STEP_0',
      fields: [],
      stepTitle: 'Select Listing Category',
      stepDescription:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque iure corporis rem quasi consequuntur ipsum ab sequi explicabo ',
      customStep: (
        <View style={{ flex: 1, marginTop: APP_STYLE_VALUES.SPACE_SIZES.sp4 }}>
          <CardListingCategories
            showDescriptions={true}
            selectedCategory={values?.categoryId}
            handleSelectCategory={handleCategorySelect}
          />
        </View>
      ),
    },
    {
      id: 'STEP_1',
      stepTitle: 'Estate Type',
      stepDescription:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque iure corporis rem quasi consequuntur ipsum ab sequi explicabo ',
      fields: [
        {
          label: 'Estate Type',
          name: 'estate_type',
          placeholder: 'Select estate type...',
          type: 'select',
        },
      ],
    },
    {
      id: 'STEP_2',
      stepTitle: 'Listing Details',
      stepDescription:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque iure corporis rem quasi consequuntur ipsum ab sequi explicabo ',
      fields: [
        {
          label: 'Title',
          name: 'title',
          placeholder: 'Enter Listing Title...',
          type: 'text',
        },
        {
          label: 'Description',
          name: 'description',
          placeholder: 'Enter listing description...',
          type: 'textarea',
        },
        {
          label: 'Price',
          name: 'price',
          placeholder: '0-100',
          type: 'number',
        },
      ],
    },
    {
      id: 'STEP_3',
      stepTitle: 'Loaction',
      stepDescription:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque iure corporis rem quasi consequuntur ipsum ab sequi explicabo ',
      fields: [
        {
          label: 'Country',
          name: 'country',
          placeholder: 'Select Country',
          type: 'select',
        },
        {
          label: 'City',
          name: 'city',
          placeholder: 'Select city',
          type: 'select',
        },
        {
          label: 'Title',
          name: 'title',
          placeholder: 'Enter Listing Title...',
          type: 'text',
        },
        {
          label: 'Full Address',
          name: 'fulladdress',
          placeholder: 'Enter Full Address...',
          type: 'text',
        },
        {
          label: 'Show Full Address In Post Details',
          name: 'show_full_address',
          type: 'checkbox',
        },
      ],
    },
    {
      id: 'STEP_5',
      stepTitle: 'Communication & Terms',
      stepDescription:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque iure corporis rem quasi consequuntur ipsum ab sequi explicabo ',
      fields: [
        {
          label: 'Allow messaging',
          name: 'allow_messaging',
          type: 'checkbox',
        },
        {
          label: 'Allow Phone Calls',
          name: 'allow_phone_calls',
          type: 'checkbox',
        },
        {
          label: 'Terms',
          name: 'terms',
          placeholder:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo provident natus recusandae nostrum praesentium non voluptatibus id fugiat architecto doloribus!',
          type: 'checkbox',
        },
      ],
    },
  ];
  const defaultValues = { COUNTRY: 'Estonia' };

  const handleSubmit = (values: Record<string, any>) => {
    console.log(values);
  };

  return (
    <ScreenWrapperContainer>
      <FormWizard
        values={values}
        setValues={setValues}
        steps={steps}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
      />
    </ScreenWrapperContainer>
  );
};

export default WizardListingCreate;
