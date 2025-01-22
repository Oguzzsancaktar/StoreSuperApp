import { Fragment, useEffect, useMemo, useRef } from "react";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { KeyboardAvoidingView, Platform, View } from "react-native";

import { map } from "lodash";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";
import { IInputProps } from "@/interfaces/app";
import validationUtils, { ICommonFieldNames } from "@/utils/validationUtils";

import { ButtonStyled } from "../button";
import ScrollViewStyled from "../override/ScrollViewStyled";
import { TextStyled } from "../typography";
import FormInputComponents from "./FormInputComponents";

export interface IProps {
  submitKey: string;
  fields: Array<IInputProps>;
  values: Record<string, any>;
  onSubmit(values: Record<string, any>): void;
  isLastStep?: boolean;
  isCurrentCustom?: boolean;
  isNextDisabled?: boolean;
  isLoading?: boolean;
  showReset?: boolean;
  setValues?: (values: Record<string, any>) => void;
}

const FormStyled: React.FC<Readonly<IProps>> = ({
  submitKey,
  fields,
  onSubmit,
  isLastStep = true,
  isCurrentCustom,
  isNextDisabled,
  isLoading,
  showReset,
  setValues,
  values,
}) => {
  const { commonStyles } = useAppStyles();

  const formInstance = useForm({
    values: values,
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = formInstance;

  const subCategoryWatched = watch("subCategory");
  const subCategoryIdsWatched = watch("subCategoryIds");
  const all = watch();

  const countryWatched = watch("country");
  const cityWatched = watch("city");

  const oldTriggerValues = useRef({
    subCategory: values?.subCategory,
    subCategoryIds: values?.subCategoryIds,
    country: values?.country,
    city: values?.city,
  });

  useEffect(() => {
    if (setValues) {
      if (
        JSON.stringify(oldTriggerValues.current.country) !==
        JSON.stringify(countryWatched)
      ) {
        oldTriggerValues.current.country = countryWatched;
        setValues({ ...values, country: countryWatched });
      }

      if (
        JSON.stringify(oldTriggerValues.current.city) !==
        JSON.stringify(cityWatched)
      ) {
        oldTriggerValues.current.city = cityWatched;
        setValues({ ...values, city: cityWatched });
      }
      if (
        JSON.stringify(oldTriggerValues.current.subCategory) !==
        JSON.stringify(subCategoryWatched)
      ) {
        oldTriggerValues.current.subCategory = subCategoryWatched;
        setValues({ ...values, subCategory: subCategoryWatched });
      }
      if (
        JSON.stringify(oldTriggerValues.current.subCategoryIds) !==
        JSON.stringify(subCategoryIdsWatched)
      ) {
        oldTriggerValues.current.subCategoryIds = subCategoryIdsWatched;
        setValues({ ...values, subCategoryIds: subCategoryIdsWatched });
      }
    }
  }, [
    setValues,
    subCategoryIdsWatched,
    subCategoryWatched,
    countryWatched,
    cityWatched,
  ]);

  useEffect(() => {
    reset(values);
  }, [values]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={
        Platform.OS === "ios" ? APP_STYLE_VALUES.SPACE_SIZES.sp30 : 0
      }
      style={{ width: "100%", flex: isCurrentCustom ? undefined : 1 }}
    >
      <FormProvider {...formInstance}>
        <View
          style={{
            width: "100%",
            flex: isCurrentCustom ? undefined : 1,
          }}
        >
          <ScrollViewStyled
            contentContainerStyle={{
              paddingBottom: APP_STYLE_VALUES.SPACE_SIZES.sp4,
              gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            }}
          >
            {map(
              fields,
              ({
                name,
                type,
                required,
                label,
                placeholder,
                options,
                maxMedia,
                showReset,
                searchable,
                customStyle,
              }) => {
                const validationRules = validationUtils.getFormRulesFromField(
                  name as ICommonFieldNames,
                );
                return (
                  <Fragment key={name}>
                    <Controller
                      control={control}
                      name={name}
                      rules={{
                        ...validationRules,
                        required,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => {
                        return (
                          <View style={[{ width: "100%" }, customStyle || {}]}>
                            <FormInputComponents
                              showReset={showReset}
                              searchable={searchable}
                              formInstance={formInstance}
                              name={name}
                              type={type}
                              value={value}
                              label={label}
                              options={options}
                              maxMedia={maxMedia}
                              placeholder={placeholder}
                              onChange={onChange}
                              onBlur={onBlur}
                            />
                          </View>
                        );
                      }}
                    />

                    {errors[name] && (
                      <View
                        style={{
                          marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp1,
                          marginLeft: APP_STYLE_VALUES.SPACE_SIZES.sp1,
                        }}
                      >
                        <TextStyled
                          customColor="error"
                          textAlignment="left"
                          fontSize="md"
                          fontWeight="regular"
                        >
                          {label || ""} is invalid.
                        </TextStyled>
                      </View>
                    )}
                  </Fragment>
                );
              },
            )}
          </ScrollViewStyled>

          <View
            style={[
              commonStyles.flexStyles.rowBetween,
              {
                gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
                height:
                  APP_STYLE_VALUES.WH_SIZES.lg +
                  APP_STYLE_VALUES.SPACE_SIZES.sp2,
              },
            ]}
          >
            {showReset && (
              <View style={{ flex: 1 }}>
                <ButtonStyled
                  isLoading={isLoading}
                  disabled={isNextDisabled}
                  onPress={() => {
                    onSubmit({});
                  }}
                  variant="primaryOutlined"
                  text={"Reset"}
                />
              </View>
            )}
            <View style={{ flex: 1 }}>
              <ButtonStyled
                isLoading={isLoading}
                disabled={isNextDisabled}
                onPress={handleSubmit(onSubmit)}
                variant="primarySolid"
                text={isLastStep ? submitKey : "Next"}
              />
            </View>
          </View>
        </View>
      </FormProvider>
    </KeyboardAvoidingView>
  );
};

export default FormStyled;
