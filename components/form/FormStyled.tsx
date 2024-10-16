import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ButtonStyled } from '../button';
import { InputStyled } from '../input';
import { View } from 'react-native';

export interface FormFieldProps {
  name: string;
}

export interface IProps {
  fields: Array<FormFieldProps>;
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
  const { handleSubmit, register, reset } = formInstance;

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

      <View>
        {fields.map(({ name }) => (
          <InputStyled key={name} placeholder={name} {...register(name)} />
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
