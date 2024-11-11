import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { InnerCommonContainer } from '@/components/containers';
import useCommonStyles from '@/hooks/useCommonStyles';
import { FormWizard } from '@/components/form';
import { IFormWizardStepProps } from '@/components/form/FormWizard';
import { TextStyled } from '@/components/typography';
import { View } from 'react-native';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import CardListingCategories from '@/components/cards/listing/CardListingCategories';
import { useMemo, useState } from 'react';
import IListingCategory from '@/interfaces/listing/IListingCategory';
import { useGetListingCategorySubsQuery } from '@/services/listingFilterServices';
import ISelectOption from '@/interfaces/theme/ISelectOption';
import { map } from 'lodash';

const WizardListingCreate = () => {
  const [values, setValues] = useState<Record<string, any>>({});

  console.log('Wizard listing values', values);
  const { data: listingCategorySubData } = useGetListingCategorySubsQuery(
    values?.categoryId
  );

  const subCategoryOptions: ISelectOption[] = useMemo(() => {
    return map(listingCategorySubData, (subCat) => {
      return {
        label: subCat.name,
        value: subCat.id,
      };
    });
  }, [listingCategorySubData]);

  const handleCategorySelect = (categoryId: IListingCategory['id']) => {
    setValues((prev) => {
      return { ...prev, estate_type: undefined, categoryId };
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
      stepTitle: 'Listing Category Sub',
      stepDescription:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque iure corporis rem quasi consequuntur ipsum ab sequi explicabo ',
      fields: [
        {
          required: true,
          label: 'Listing Category Sub',
          name: 'estate_type',
          placeholder: 'Select estate type...',
          type: 'select',
          options: subCategoryOptions,
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
          required: true,
          label: 'Post Photos',
          name: 'media',
          placeholder: 'Add Media...',
          type: 'upload',
          maxMedia: 6,
        },
        {
          required: true,
          label: 'Title',
          name: 'title',
          placeholder: 'Enter Listing Title...',
          type: 'text',
        },
        {
          required: true,
          label: 'Description',
          name: 'description',
          placeholder: 'Enter listing description...',
          type: 'textarea',
        },
        {
          required: true,
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
          required: true,
          label: 'Country',
          name: 'country',
          placeholder: 'Select Country',
          type: 'select',
        },
        {
          required: true,
          label: 'City',
          name: 'city',
          placeholder: 'Select city',
          type: 'select',
        },
        {
          required: true,
          label: 'Zip Code',
          name: 'zipcode',
          placeholder: 'Enter Listing Zip Code...',
          type: 'number',
        },
        {
          required: true,
          label: 'Full Address',
          name: 'fulladdress',
          placeholder: 'Enter Full Address...',
          type: 'textarea',
        },
        {
          required: false,
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
          required: false,
          label: 'Allow messaging',
          name: 'allow_messaging',
          type: 'checkbox',
        },
        {
          required: false,
          label: 'Allow Phone Calls',
          name: 'allow_phone_calls',
          type: 'checkbox',
        },
        {
          required: true,
          label: 'Terms',
          name: 'terms',
          placeholder:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo provident natus recusandae nostrum praesentium non voluptatibus id fugiat architecto doloribus!',
          type: 'checkbox',
        },
      ],
    },
  ];
  const defaultValues = {};

  const handleSubmit = (values: Record<string, any>) => {
    console.log(values);
  };

  return (
    <ScreenWrapperContainer>
      <FormWizard
        isNextDisabled={!values?.categoryId}
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
