import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { FormWizard } from '@/components/form';
import { IFormWizardStepProps } from '@/components/form/FormWizard';
import { View, ViewStyle } from 'react-native';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import CardListingCategories from '@/components/cards/listing/CardListingCategories';
import { useMemo, useState } from 'react';
import IListingCategory from '@/interfaces/listing/IListingCategory';
import {
  useGetListingCategoryOptionsQuery,
  useGetListingCategorySubsQuery,
} from '@/services/listingFilterServices';
import ISelectOption from '@/interfaces/theme/ISelectOption';
import { each, forEach, map, reduce } from 'lodash';
import EListingOptionComponentType from '@/interfaces/enums/EListingOptionComponentType';
import useThemedStyles from '@/hooks/useThemedStyles';
import { IInputProps } from '@/interfaces/app';
import IListingCreateDTO from '@/interfaces/listing/IListingCreateDTO';
import ETranslationLanguages from '@/interfaces/enums/ELanguages';
import IListingOptionCreateDTO from '@/interfaces/listing/IListingOptionCreateDTO';
import {
  useUploadListingMediaMutation,
  useCreateListingMutation,
} from '@/services/listingServices';
import { Href, router, useNavigation } from 'expo-router';
import APP_ROUTES from '@/constants/APP_ROUTES';

const WizardListingCreate = () => {
  const [values, setValues] = useState<Record<string, any>>({});

  const navigation = useNavigation();
  const [
    createListing,
    { data: createdListingData, isLoading: createListingIsLoading },
  ] = useCreateListingMutation();
  const [uploadListingMedia, { isLoading: uploadListingMediaIsLoading }] =
    useUploadListingMediaMutation();

  const { data: listingCategorySubData } = useGetListingCategorySubsQuery(
    values?.categoryId
  );

  const themedStyles = useThemedStyles();

  const { data: listingCategoryOptionsData } =
    useGetListingCategoryOptionsQuery(values?.categoryId);

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
      return { categoryId };
    });
  };

  const steps: IFormWizardStepProps[] = useMemo(
    () => [
      {
        id: 'STEP_0',
        fields: [],
        stepTitle: 'Listing Category',
        stepDescription: 'Select listing category...',
        customStep: (
          <View
            style={{ flex: 1, marginTop: APP_STYLE_VALUES.SPACE_SIZES.sp4 }}
          >
            <CardListingCategories
              showDescriptions={true}
              selectedCategory={values?.categoryId}
              handleSelectCategory={handleCategorySelect}
            />
          </View>
        ),
      },

      {
        id: 'STEP_2',
        stepTitle: 'General Information',
        stepDescription:
          'Upload photos, enter title and other general information...',
        fields: [
          {
            required: true,
            label: 'Add Photos',
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
            placeholder: 'Enter price...',
            type: 'number',
          },
          {
            required: true,
            label: 'Price Currency',
            name: 'currency',
            placeholder: 'Enter price...',
            options: [
              { label: 'MKD', value: 'MKD' },
              { label: 'EUR', value: 'EUR' },
            ],
            type: 'select',
          },
          {
            required: false,
            label: 'Negotiable',
            name: 'negotiable',
            type: 'switch',
          },
        ],
      },
      {
        id: 'STEP_1',
        stepTitle: 'Details',
        stepDescription: 'Select sub category and fill out listing details...',
        fields: [
          {
            required: true,
            label: 'Listing Category Sub',
            name: 'estateType',
            placeholder: 'Select estate type...',
            type: 'select',
            options: subCategoryOptions,
          },

          ...map(listingCategoryOptionsData, (option) => {
            const options: ISelectOption[] = map(option.values, (opt) => {
              return {
                value: opt.id,
                label: opt.name,
              };
            });
            return {
              required: false,
              label: option.name,
              name: option.id,
              placeholder: option.name + '...',
              type: EListingOptionComponentType[option.propertyType],
              options: options,
            } as IInputProps;
          }),
        ],
      },
      {
        id: 'STEP_3',
        stepTitle: "Listing's Location",
        stepDescription: 'Enter your address information...',
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
            label: 'District',
            name: 'district',
            placeholder: 'Select district',
            type: 'select',
          },
          {
            required: true,
            label: 'Zip Code',
            name: 'zipCode',
            placeholder: 'Enter Listing Zip Code...',
            type: 'number',
          },
          {
            required: true,
            label: 'Full Address',
            name: 'fullAddress',
            placeholder: 'Enter Full Address...',
            type: 'textarea',
          },
          {
            required: false,
            label: 'Show Full Address In Post Details',
            name: 'showFullAddress',
            type: 'checkbox',
          },
        ],
      },
      {
        id: 'STEP_4',
        stepTitle: 'Communication & Terms',
        stepDescription:
          'Select your communication preferences & create a listing...',
        fields: [
          {
            required: false,
            label: 'Allow messaging',
            name: 'allowMessaging',
            type: 'checkbox',
          },
          {
            customStyle: {
              ...themedStyles.borderStyles.bottomUnderline,
              paddingBottom: APP_STYLE_VALUES.SPACE_SIZES.sp4,
              marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            } as ViewStyle,
            required: false,
            label: 'Allow Phone Calls',
            name: 'allowPhoneCalls',
            type: 'checkbox',
          },
          {
            required: true,
            label: 'Terms & Conditions ',
            placeholder:
              'Yes, I accept the Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et',
            name: 'terms',
            type: 'checkbox',
          },
        ],
      },
    ],
    [listingCategoryOptionsData, values]
  );

  const defaultValues = {
    categoryId: '38374e8d-7944-45d7-5d36-08dbdea8608d',
    estateType: {
      label: 'Building land',
      value: '072d80df-32a7-464b-2eaa-08dbe4841286',
      _index: 1,
    },
    '0c53a7ae-5279-4148-ed72-08dbdfc3c894': '120m2',
    'eccf7345-33bc-48c1-ed73-08dbdfc3c894': true,
    'f5429d3d-9f6f-4a10-ed74-08dbdfc3c894': {
      value: 'eb84a2dd-9f41-48fb-3377-08dbdfc3c899',
      label: '3+1',
      _index: 2,
    },
    '79ddcb45-8d3b-4902-f7ac-08dbe4d885f8': {
      value: 'dcfc9be2-a09e-44ab-e415-08dbe4d88601',
      label: 'For Rent',
      _index: 1,
    },
    '18edd6f5-df93-485c-f7ad-08dbe4d885f8': {
      value: '35ad3546-eab4-4ce9-e417-08dbe4d88601',
      label: '1',
      _index: 0,
    },
    '634e8806-a26c-42ce-f7ae-08dbe4d885f8': '22',
    'a46ffc4e-844c-46b6-f7af-08dbe4d885f8': '3',
    'd859330f-71b6-4734-f7b0-08dbe4d885f8': [
      {
        value: 'b1fc5175-6621-4a8c-e41c-08dbe4d88601',
        label: 'Cellar',
        isChecked: true,
      },
      {
        value: '87b4390d-01ec-4fe0-e41d-08dbe4d88601',
        label: 'Parking place',
        isChecked: false,
      },
      {
        value: 'f9ca7d99-838d-4bc0-e41e-08dbe4d88601',
        label: 'Garage',
        isChecked: false,
      },
      {
        value: '323819f2-ba87-4472-e41f-08dbe4d88601',
        label: 'Terrace',
        isChecked: false,
      },
      {
        value: '3742fa4c-498b-4424-e420-08dbe4d88601',
        label: 'Garden',
        isChecked: true,
      },
      {
        value: '91cfb8a2-938c-49d4-e421-08dbe4d88601',
        label: 'Air conditioner',
        isChecked: false,
      },
      {
        value: '8d106253-db11-49f8-e422-08dbe4d88601',
        label: 'Elevator',
        isChecked: false,
      },
      {
        value: 'be9f8ee7-bc44-44ec-e423-08dbe4d88601',
        label: 'Registered',
        isChecked: true,
      },
    ],
    media: [
      {
        uri: 'file:///Users/oguzsancaktar/Library/Developer/CoreSimulator/Devices/4091198B-8330-4F62-B6DB-ED668694579E/data/Containers/Data/Application/CA53D63D-4D18-49E5-821B-E553691B3D8B/tmp/7016ED43-E9F0-4B3A-B837-B469C871DB86.jpg',
        name: '7016ED43-E9F0-4B3A-B837-B469C871DB86.jpg',
        type: 'image/jpg',
      },
      null,
      null,
      null,
      null,
      null,
    ],
    title: 'Test T’le Mob’le',
    description: 'Teas description',
    price: '333',
    currency: {
      label: 'EUR',
      value: 'EUR',
      _index: 0,
    },
    negotiable: true,
    country: {
      label: 'Afghanistan',
      value: 1,
      _index: 0,
    },
    city: {
      label: 'Badakhshan',
      value: 3901,
      _index: 0,
    },
    district: { label: 'Fayzabad', value: 68, _index: 1 },
    zipCode: '43333',
    fullAddress: 'Addreass',
    showFullAddress: true,
    allowMessaging: true,
    allowPhoneCalls: true,
    terms: true,
  };

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

    const tempOptions: IListingOptionCreateDTO[] = map(keys, (k) => {
      const val = others[k];

      const tempOption: IListingOptionCreateDTO = {
        categoryOptionId: k,
      };
      switch (typeof val) {
        case 'object':
          if (Array.isArray(val)) {
            tempOption.categoryOptionValueIds = map(val, (v) => v.value);
            tempOption.categoryOptionValueId = null;
            tempOption.value = null;
          } else {
            tempOption.value = null;
            tempOption.categoryOptionValueId = val.value;
            tempOption.categoryOptionValueIds = [];
          }
          break;
        case 'boolean':
          tempOption.value = val;
          tempOption.categoryOptionValueIds = [];
          tempOption.categoryOptionValueId = null;

          break;
        case 'string':
          tempOption.value = val;
          tempOption.categoryOptionValueIds = [];
          tempOption.categoryOptionValueId = null;
          break;
        default:
          break;
      }
      return tempOption;
    });

    // @todo add lat long api
    const listingCreateDTO: IListingCreateDTO = {
      categoryId,
      allowMessaging,
      allowPhoneCalls,
      isActive,
      isDraft,
      price: {
        amount: price,
        currency: currency.value,
      },
      negotiable,
      translations: [
        {
          language: 'en-US', // @todo
          description,
          title,
        },
      ],
      tags, // @todo implement tags from api
      // @todo upload photos to blobstorage and add url

      options: tempOptions,
      media,
      coverImage: media[0]?.url,

      address: {
        cityId: city?.value,
        cityName: city?.label,
        countryId: country?.value,
        countryName: country?.label,
        districtId: district?.value,
        districtName: district?.label,
        fullAddress,
        latitude: 0,
        longitude: 0,
        showFullAddress: showFullAddress,
        zipCode,
      },
    };

    if (media.length > 0) {
      const formDataForMedia = new FormData();

      forEach(media, (file) => {
        if (file) {
          formDataForMedia.append('files', file, file.name); // `files` API'deki alan adıyla eşleşmeli
        }
      });

      try {
        const uploadedMediaUrls = await uploadListingMedia(
          formDataForMedia as any
        ).unwrap();

        listingCreateDTO.media = uploadedMediaUrls;
        listingCreateDTO.coverImage = uploadedMediaUrls[0];

        const createdListingId = await createListing(listingCreateDTO).unwrap();

        router.push({
          // @todo fix find best practice for constant all routes
          pathname: APP_ROUTES.DRAWER.SUCCESS as any,
          params: {
            title: 'Listing Created',
            description: 'New Listing Created Successfully',
            href: APP_ROUTES.TABS.TIMELINE as string,
            showExtraButton: 'true',
            extraButtonText: 'Go to listing',
            extraButtonHref: ('/(private)/post/' + createdListingId) as string,
          },
        });
      } catch (error) {
        console.error('Error submit--> listing form wizard:', error);
      }
    }
  };

  return (
    <ScreenWrapperContainer>
      <FormWizard
        isLoading={uploadListingMediaIsLoading || createListingIsLoading}
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
