import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
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
import routerUtils from "@/utils/routerUtils";

const WizardListingCreate = () => {
  const { t } = useTranslation();
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
        stepTitle: t("wizard.listingCategory"),
        stepDescription: t("wizard.listingCategoryDescription"),
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
        stepTitle: t("wizard.generalInformation"),
        stepDescription: t("wizard.generalInformationDescription"),
        fields: [
          {
            required: true,
            label: t("wizard.addPhotos"),
            name: "media",
            placeholder: t("wizard.addMediaPlaceholder"),
            type: "upload",
            maxMedia: 6,
          },
          {
            required: true,
            label: t("wizard.title"),
            name: "title",
            placeholder: t("wizard.enterListingTitlePlaceholder"),
            type: "text",
          },
          {
            required: true,
            label: t("wizard.description"),
            name: "description",
            placeholder: t("wizard.enterListingDescriptionPlaceholder"),
            type: "textarea",
          },
          {
            required: true,
            label: t("wizard.price"),
            name: "price",
            placeholder: t("wizard.enterPricePlaceholder"),
            type: "number",
          },
          {
            required: true,
            label: t("wizard.priceCurrency"),
            name: "currency",
            placeholder: t("wizard.enterPriceCurrencyPlaceholder"),
            options: [
              { label: "MKD", value: "MKD" },
              { label: "EUR", value: "EUR" },
            ],
            type: "select",
          },
          {
            required: false,
            label: t("wizard.negotiable"),
            name: "negotiable",
            type: "switch",
          },
        ],
      },
      {
        id: "STEP_1",
        stepTitle: t("wizard.details"),
        stepDescription: t("wizard.detailsDescription"),
        fields: [
          {
            required: true,
            label:
              values.categoryId == "be150f8f-4371-4ffe-851d-08dbdf734510"
                ? "Make"
                : values.categoryId == "38374e8d-7944-45d7-5d36-08dbdea8608d"
                  ? "Estate Type"
                  : "Type",
            name: "subCategory",
            placeholder: t("wizard.selectEstateTypePlaceholder"),
            type: "select",
            searchable: true,
            options: subCategoryOptions,
          },

          haveSubCategory
            ? {
                required: true,
                label: t("wizard.model"),
                name: "subChildCategory",
                placeholder: t("wizard.selectSubsChildTypePlaceholder"),
                type: "select",
                searchable: true,
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
              searchable: true,
            } as IInputProps;
          }),
        ].filter((field): field is IInputProps => field !== null),
      },
      {
        id: "STEP_3",
        stepTitle: t("wizard.listingLocation"),
        stepDescription: t("wizard.listingLocationDescription"),
        fields: [
          {
            required: true,
            label: t("wizard.country"),
            name: "country",
            placeholder: t("wizard.selectCountryPlaceholder"),
            type: "select",
          },
          {
            required: true,
            label: t("wizard.city"),
            name: "city",
            placeholder: t("wizard.selectCityPlaceholder"),
            type: "select",
          },
          {
            required: true,
            label: t("wizard.district"),
            name: "district",
            placeholder: t("wizard.selectDistrictPlaceholder"),
            type: "select",
          },
          {
            required: true,
            label: t("wizard.zipCode"),
            name: "zipCode",
            placeholder: t("wizard.enterListingZipCodePlaceholder"),
            type: "number",
          },
          {
            required: true,
            label: t("wizard.fullAddress"),
            name: "fullAddress",
            placeholder: t("wizard.enterFullAddressPlaceholder"),
            type: "textarea",
          },
          {
            required: false,
            label: t("wizard.showFullAddressInPostDetails"),
            name: "showFullAddress",
            type: "checkbox",
          },
        ],
      },
      {
        id: "STEP_4",
        stepTitle: t("wizard.communicationTerms"),
        stepDescription: t("wizard.communicationTermsDescription"),
        fields: [
          {
            required: false,
            label: t("wizard.allowMessaging"),
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
            label: t("wizard.allowPhoneCalls"),
            name: "allowPhoneCalls",
            type: "checkbox",
          },
          {
            required: true,
            label: t("wizard.termsAndConditions"),
            placeholder: t("wizard.termsAndConditionsPlaceholder"),
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
      t,
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
          language: "en-US",
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

        setValues({});

        router.push({
          pathname: routerUtils.buildRoute(
            APP_ROUTES.PUBLIC.DRAWER.SUCCESS,
            {},
          ),
          params: {
            title: t("success.listingCreated"),
            description: t("success.listingCreatedDescription"),
            href: APP_ROUTES.TABS.TIMELINE as string,
            showExtraButton: "true",
            extraButtonText: t("success.goToListing"),
            extraButtonHref: routerUtils.buildRoute(
              APP_ROUTES.PUBLIC.DRAWER.POST.LISTING,
              { listingId: createdListingId },
            ),
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
