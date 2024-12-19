import { useMemo, useState } from "react";
import { View, ViewStyle } from "react-native";

import { router } from "expo-router";
import { forEach, map } from "lodash";

import CardListingCategories from "@/components/cards/listing/CardListingCategories";
import { FormWizard } from "@/components/form";
import { IFormWizardStepProps } from "@/components/form/FormWizard";
import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";
import { IInputProps } from "@/interfaces/app";
import EListingOptionComponentType from "@/interfaces/enums/EListingOptionComponentType";
import IListingCategory from "@/interfaces/listing/IListingCategory";
import IListingCreateDTO from "@/interfaces/listing/IListingCreateDTO";
import IListingOptionCreateDTO from "@/interfaces/listing/IListingOptionCreateDTO";
import ISelectOption from "@/interfaces/theme/ISelectOption";
import {
  useGetListingCategoryOptionsQuery,
  useGetListingCategorySubsQuery,
} from "@/services/listingFilterServices";
import {
  useCreateListingMutation,
  useUploadListingMediaMutation,
} from "@/services/listingServices";

const WizardListingCreate = () => {
  const { themedStyles } = useAppStyles();

  const [values, setValues] = useState<Record<string, any>>({});

  const [
    createListing,
    { data: createdListingData, isLoading: createListingIsLoading },
  ] = useCreateListingMutation();

  const [uploadListingMedia, { isLoading: uploadListingMediaIsLoading }] =
    useUploadListingMediaMutation();

  const { data: listingCategorySubData } = useGetListingCategorySubsQuery(
    values?.categoryId,
    {
      skip: !values?.categoryId,
    },
  );

  const { data: listingCategoryChildSubData } = useGetListingCategorySubsQuery(
    values?.subCategory?.value,
    {
      skip: !values?.subCategory,
    },
  );

  const { data: listingCategoryOptionsData } =
    useGetListingCategoryOptionsQuery(values?.categoryId, {
      skip: !values?.categoryId,
    });

  const subCategoryOptions: ISelectOption[] = useMemo(() => {
    return map(listingCategorySubData, (subCat) => {
      return {
        label: subCat.name,
        value: subCat.id,
      };
    });
  }, [listingCategorySubData]);

  const subsSubCategoryOptions: ISelectOption[] = useMemo(() => {
    return map(listingCategoryChildSubData, (subCat) => {
      return {
        label: subCat.name,
        value: subCat.id,
      };
    });
  }, [listingCategoryChildSubData]);

  const haveSubCategory = useMemo(() => {
    return listingCategorySubData ? listingCategorySubData[0]?.hasChild : false;
  }, [listingCategorySubData]);

  const handleCategorySelect = (categoryId: IListingCategory["id"]) => {
    setValues((prev) => {
      return { categoryId };
    });
  };

  const steps: IFormWizardStepProps[] = useMemo(
    () => [
      {
        id: "STEP_0",
        fields: [],
        stepTitle: "Listing Category",
        stepDescription: "Select listing category...",
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
        id: "STEP_2",
        stepTitle: "General Information",
        stepDescription:
          "Upload photos, enter title and other general information...",
        fields: [
          {
            required: true,
            label: "Add Photos",
            name: "media",
            placeholder: "Add Media...",
            type: "upload",
            maxMedia: 6,
          },
          {
            required: true,
            label: "Title",
            name: "title",
            placeholder: "Enter Listing Title...",
            type: "text",
          },
          {
            required: true,
            label: "Description",
            name: "description",
            placeholder: "Enter listing description...",
            type: "textarea",
          },
          {
            required: true,
            label: "Price",
            name: "price",
            placeholder: "Enter price...",
            type: "number",
          },
          {
            required: true,
            label: "Price Currency",
            name: "currency",
            placeholder: "Enter price...",
            options: [
              { label: "MKD", value: "MKD" },
              { label: "EUR", value: "EUR" },
            ],
            type: "select",
          },
          {
            required: false,
            label: "Negotiable",
            name: "negotiable",
            type: "switch",
          },
        ],
      },
      {
        id: "STEP_1",
        stepTitle: "Details",
        stepDescription: "Select sub category and fill out listing details...",
        fields: [
          {
            required: true,
            label: "Listing Category Sub",
            name: "subCategory",
            placeholder: "Select estate type...",
            type: "select",
            options: subCategoryOptions,
          },

          haveSubCategory
            ? {
                required: true,
                label: "Listing Category Subs sub",
                name: "subChildCategory",
                placeholder: "Select subs child type...",
                type: "select",
                options: subsSubCategoryOptions,
              }
            : null,

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
              placeholder: option.name + "...",
              type: EListingOptionComponentType[option.propertyType],
              options: options,
            } as IInputProps;
          }),
        ].filter((field): field is IInputProps => field !== null),
      },
      {
        id: "STEP_3",
        stepTitle: "Listing's Location",
        stepDescription: "Enter your address information...",
        fields: [
          {
            required: true,
            label: "Country",
            name: "country",
            placeholder: "Select Country",
            type: "select",
          },
          {
            required: true,
            label: "City",
            name: "city",
            placeholder: "Select city",
            type: "select",
          },
          {
            required: true,
            label: "District",
            name: "district",
            placeholder: "Select district",
            type: "select",
          },
          {
            required: true,
            label: "Zip Code",
            name: "zipCode",
            placeholder: "Enter Listing Zip Code...",
            type: "number",
          },
          {
            required: true,
            label: "Full Address",
            name: "fullAddress",
            placeholder: "Enter Full Address...",
            type: "textarea",
          },
          {
            required: false,
            label: "Show Full Address In Post Details",
            name: "showFullAddress",
            type: "checkbox",
          },
        ],
      },
      {
        id: "STEP_4",
        stepTitle: "Communication & Terms",
        stepDescription:
          "Select your communication preferences & create a listing...",
        fields: [
          {
            required: false,
            label: "Allow messaging",
            name: "allowMessaging",
            type: "checkbox",
          },
          {
            customStyle: {
              ...themedStyles.borderStyles.bottomUnderline,
              paddingBottom: APP_STYLE_VALUES.SPACE_SIZES.sp4,
              marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            } as ViewStyle,
            required: false,
            label: "Allow Phone Calls",
            name: "allowPhoneCalls",
            type: "checkbox",
          },
          {
            required: true,
            label: "Terms & Conditions ",
            placeholder:
              "Yes, I accept the Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et",
            name: "terms",
            type: "checkbox",
          },
        ],
      },
    ],
    [
      handleCategorySelect,
      listingCategoryOptionsData,
      listingCategoryChildSubData,
      subCategoryOptions,
      subsSubCategoryOptions,
      haveSubCategory,
      values,
    ],
  );

  const handleSubmit = async (values: Record<string, any>) => {
    const {
      categoryId = "",
      allowMessaging = false,
      allowPhoneCalls = false,
      isActive = true,
      isDraft = true,
      subChildCategory = {},
      city = {},
      country = {},
      district = {},
      fullAddress = "",
      showFullAddress = false,
      zipCode = "",
      tags = [],
      translations = [],
      currency = {},
      description = "",
      title = "",
      media = [],
      options = [],
      price = {},
      negotiable = false,
      coverImage = "",
      terms,
      subCategory,
      ...others
    } = values || {};

    console.log("values", values);

    const keys = Object.keys(others);

    const tempOptions: IListingOptionCreateDTO[] = map(keys, (k) => {
      const val = others[k];

      const tempOption: IListingOptionCreateDTO = {
        categoryOptionId: k,
      };
      switch (typeof val) {
        case "object":
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
        case "boolean":
          tempOption.value = val;
          tempOption.categoryOptionValueIds = [];
          tempOption.categoryOptionValueId = null;

          break;
        case "string":
          tempOption.value = val;
          tempOption.categoryOptionValueIds = [];
          tempOption.categoryOptionValueId = null;
          break;
        default:
          break;
      }
      return tempOption;
    });

    const listingCreateDTO: IListingCreateDTO = {
      categoryId: subChildCategory?.value || subCategory?.value || categoryId,
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
          language: "en-US", // @todo
          description,
          title,
        },
      ],
      tags,
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
          formDataForMedia.append("files", file, file.name); // `files` API'deki alan adıyla eşleşmeli
        }
      });

      try {
        const uploadedMediaUrls = await uploadListingMedia(
          formDataForMedia as any,
        ).unwrap();

        listingCreateDTO.media = uploadedMediaUrls;
        listingCreateDTO.coverImage = uploadedMediaUrls[0];

        const createdListingId = await createListing(listingCreateDTO).unwrap();

        router.push({
          // @todo fix find best practice for constant all routes
          pathname: APP_ROUTES.DRAWER.SUCCESS as any,
          params: {
            title: "Listing Created",
            description: "New Listing Created Successfully",
            href: APP_ROUTES.TABS.TIMELINE as string,
            showExtraButton: "true",
            extraButtonText: "Go to listing",
            // @todo path route
            extraButtonHref: ("/(drawer)/post/" + createdListingId) as string,
          },
        });
      } catch (error) {
        console.error("Error submit--> listing form wizard:", error);
      }
    }
  };

  return (
    <FormWizard
      isTabBarActive={true}
      isLoading={uploadListingMediaIsLoading || createListingIsLoading}
      isNextDisabled={!values?.categoryId}
      values={values}
      setValues={setValues}
      steps={steps}
      onSubmit={handleSubmit}
    />
  );
};

export default WizardListingCreate;
