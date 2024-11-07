import { Fragment, useEffect, useMemo } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { ButtonStyled } from '../button';
import { InputStyled } from '../input';
import { View } from 'react-native';
import { map } from 'lodash';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { IInputProps } from '@/interfaces/app';
import { TextStyled } from '../typography';
import APP_VALIDATION_PATTERNS from '@/constants/APP_VALIDATION_PATTERNS';
import useCommonStyles from '@/hooks/useCommonStyles';

export interface IProps {
  fields: Array<IInputProps>;
  defaultValues: Record<string, any>;
  onSubmit(values: Record<string, any>): void;
  showBackButton?: boolean;
  onBack(values: Record<string, any>): void;
  isLastStep: boolean;
  isCurrentCustom: boolean;
}

const FormStyled: React.FC<Readonly<IProps>> = ({
  fields,
  defaultValues,
  onSubmit,
  showBackButton,
  onBack,
  isLastStep,
  isCurrentCustom,
}) => {
  const commonStyles = useCommonStyles();

  const handleBack = () => {
    const values = formInstance.getValues();
    onBack(values);
  };

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

  console.log('isCurrentCustom', isCurrentCustom);
  return (
    <FormProvider {...formInstance}>
      <View
        style={{
          flex: isCurrentCustom ? undefined : 1,
          height: isCurrentCustom
            ? showBackButton
              ? APP_STYLE_VALUES.WH_SIZES.lg * 2 +
                APP_STYLE_VALUES.SPACE_SIZES.sp2
              : APP_STYLE_VALUES.WH_SIZES.lg
            : undefined,
        }}
      >
        <View style={{ flex: 1, gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 }}>
          {map(fields, ({ name, type, label, placeholder }) => {
            let tempRegexPattern: RegExp = /^.+$/;

            switch (name) {
              case 'firstname':
                tempRegexPattern = APP_VALIDATION_PATTERNS.USERNAME_PATTERN;
                break;
              case 'email':
                tempRegexPattern = APP_VALIDATION_PATTERNS.EMAIL_PATTERN;
                break;
              case 'password':
                tempRegexPattern = APP_VALIDATION_PATTERNS.PASSWORD_PATTERN;
                break;
              case 'password_confirm':
                tempRegexPattern = APP_VALIDATION_PATTERNS.PASSWORD_PATTERN;
                break;
              default:
                tempRegexPattern = APP_VALIDATION_PATTERNS.EMAIL_PATTERN;
                break;
            }

            return (
              <Fragment key={name}>
                <Controller
                  control={control}
                  name={name}
                  rules={{
                    required: true,
                    pattern: tempRegexPattern,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputStyled
                      name={name}
                      type={type}
                      label={label}
                      style={{ borderWidth: 1, padding: 10 }}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder={placeholder}
                    />
                  )}
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
          })}
        </View>

        <View
          style={[
            commonStyles.flexStyles.colCenter,
            {
              gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
              height: showBackButton
                ? APP_STYLE_VALUES.WH_SIZES.lg * 2 +
                  APP_STYLE_VALUES.SPACE_SIZES.sp2
                : APP_STYLE_VALUES.WH_SIZES.lg,
            },
          ]}
        >
          {showBackButton && (
            <ButtonStyled
              variant="buttonPrimaryOutlined"
              text="Back"
              onPress={handleBack}
            />
          )}
          <ButtonStyled
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
