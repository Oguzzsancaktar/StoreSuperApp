import { Fragment, useEffect, useMemo } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { ButtonGoBack, ButtonStyled } from '../button';
import { ScrollView, View } from 'react-native';
import { map } from 'lodash';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { IInputProps } from '@/interfaces/app';
import { TextStyled } from '../typography';
import APP_VALIDATION_PATTERNS from '@/constants/APP_VALIDATION_PATTERNS';
import useCommonStyles from '@/hooks/useCommonStyles';
import FormInputComponents from './FormInputComponents';
import validationUtils from '@/utils/validationUtils';

export interface IProps {
  fields: Array<IInputProps>;
  defaultValues: Record<string, any>;
  onSubmit(values: Record<string, any>): void;
  onBack(values: Record<string, any>): void;
  isLastStep: boolean;
  isCurrentCustom: boolean;
  isNextDisabled?: boolean;
}

const FormStyled: React.FC<Readonly<IProps>> = ({
  fields,
  defaultValues,
  onSubmit,
  isLastStep,
  isCurrentCustom,
  isNextDisabled,
}) => {
  const commonStyles = useCommonStyles();

  const formInstance = useForm({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = formInstance;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <FormProvider {...formInstance}>
      <View
        style={{
          flex: isCurrentCustom ? undefined : 1,
          height: isCurrentCustom ? APP_STYLE_VALUES.WH_SIZES.lg : undefined,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
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
              customStyle,
            }) => {
              const validationRules =
                validationUtils.getFormRulesFromField(name);
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
                        <View style={customStyle || {}}>
                          <FormInputComponents
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
                        {label || ''} is invalid.
                      </TextStyled>
                    </View>
                  )}
                </Fragment>
              );
            }
          )}
        </ScrollView>

        <View
          style={[
            commonStyles.flexStyles.colCenter,
            {
              gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
              height: APP_STYLE_VALUES.WH_SIZES.lg,

              // showBackButton
              //   ? APP_STYLE_VALUES.WH_SIZES.lg * 2 +
              //     APP_STYLE_VALUES.SPACE_SIZES.sp2
              //   : APP_STYLE_VALUES.WH_SIZES.lg,
            },
          ]}
        >
          <ButtonStyled
            disabled={isNextDisabled}
            onPress={handleSubmit(onSubmit)}
            variant="buttonPrimarySolid"
            text={isLastStep ? 'Submit' : 'Next'}
          />
        </View>
      </View>
    </FormProvider>
  );
};

export default FormStyled;
