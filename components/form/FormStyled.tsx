import { Fragment, useEffect, useMemo } from 'react';
import { FormProvider, useForm, Controller, useWatch } from 'react-hook-form';
import { ButtonStyled } from '../button';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { map } from 'lodash';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { IInputProps } from '@/interfaces/app';
import { TextStyled } from '../typography';
import useCommonStyles from '@/hooks/useCommonStyles';
import FormInputComponents from './FormInputComponents';
import validationUtils from '@/utils/validationUtils';
import ScrollViewStyled from '../override/ScrollViewStyled';

export interface IProps {
  submitKey: string;
  fields: Array<IInputProps>;
  defaultValues: Record<string, any>;
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
  defaultValues,
  onSubmit,
  isLastStep = 'true',
  isCurrentCustom,
  isNextDisabled,
  isLoading,
  showReset,
  setValues,
  values,
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

  console.log('values', values);

  const watchedValues = useWatch({ control });
  useEffect(() => {
    if (setValues && JSON.stringify(watchedValues) !== JSON.stringify(values)) {
      setValues(watchedValues);
    }
  }, [watchedValues, setValues, values]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? APP_STYLE_VALUES.SPACE_SIZES.sp30 : 0
      }
      style={{ width: '100%', flex: isCurrentCustom ? undefined : 1 }}
    >
      <FormProvider {...formInstance}>
        <View
          style={{
            width: '100%',
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
                          <View style={[{ width: '100%' }, customStyle || {}]}>
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
                          {label || ''} is invalid.
                        </TextStyled>
                      </View>
                    )}
                  </Fragment>
                );
              }
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
                  onPress={() => onSubmit({})}
                  variant="primaryOutlined"
                  text={'Reset'}
                />
              </View>
            )}
            <View style={{ flex: 1 }}>
              <ButtonStyled
                isLoading={isLoading}
                disabled={isNextDisabled}
                onPress={handleSubmit(onSubmit)}
                variant="primarySolid"
                text={isLastStep ? submitKey : 'Next'}
              />
            </View>
          </View>
        </View>
      </FormProvider>
    </KeyboardAvoidingView>
  );
};

export default FormStyled;
