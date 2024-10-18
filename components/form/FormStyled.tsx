import React, { Fragment, useEffect, useMemo } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { ButtonStyled } from '../button';
import { InputStyled } from '../input';
import { View, Text } from 'react-native';
import { map } from 'lodash';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { IInputProps } from '@/interfaces/app';

export interface IProps {
  fields: Array<IInputProps>;
  defaultValues: Record<string, any>;
  onSubmit(values: Record<string, any>): void;
  showBackButton?: boolean;
  onBack(values: Record<string, any>): void;
}

const FormStyled: React.FC<Readonly<IProps>> = (props) => {
  const { fields, defaultValues, onSubmit } = props;
  const { showBackButton, onBack } = props;

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

  return (
    <FormProvider {...formInstance}>
      {showBackButton && (
        <ButtonStyled
          variant="buttonPrimaryOutlined"
          text="Back"
          onPress={handleBack}
        />
      )}

      <View
        style={{
          gap: APP_STYLE_VALUES.SPACE_SIZES.sp3,
        }}
      >
        {map(fields, ({ name, type, label, placeholder }) => (
          <Fragment key={name}>
            <Controller
              control={control}
              name="email"
              rules={{
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputStyled
                  name={name}
                  type={type}
                  label={label}
                  style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder={placeholder}
                />
              )}
            />

            {errors.email && <Text>Email is invalid.</Text>}
          </Fragment>
        ))}

        <ButtonStyled
          onPress={handleSubmit(onSubmit)}
          variant="buttonPrimarySolid"
          text="Submit"
        />
      </View>
    </FormProvider>
  );
};

export default FormStyled;
