import { FormStyled } from '.';
import { useDrawerState } from '@/contexts/DrawerContext';
import APP_INPUT_FIELDS from '@/constants/APP_INPUT_FIELDS';
import { IInputProps } from '@/interfaces/app';

const FormPersonalInformation = () => {
  const { toggleDrawer } = useDrawerState();

  const fields: Array<IInputProps> = [
    { ...APP_INPUT_FIELDS.INPUT_FISTNAME },
    { ...APP_INPUT_FIELDS.INPUT_LASTNAME },
    { ...APP_INPUT_FIELDS.INPUT_BIRTHDAY },
  ];

  const defaultValues = {};

  const handleSubmit = async (values: Record<string, any>) => {
    toggleDrawer();
  };

  // @todo create custom scrollwiev
  return (
    <FormStyled
      defaultValues={defaultValues}
      fields={fields}
      onSubmit={handleSubmit}
      submitKey="Save"
    />
  );
};

export default FormPersonalInformation;
