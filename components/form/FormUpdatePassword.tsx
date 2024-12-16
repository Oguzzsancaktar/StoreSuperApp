import { useSession } from '@/contexts/AuthContext';
import { FormStyled } from '.';
import APP_INPUT_FIELDS from '@/constants/APP_INPUT_FIELDS';
import IPassordUpdateDTO from '@/interfaces/account/IPassordUpdateDTO';
import { IInputProps } from '@/interfaces/app';
import { useUpdatePasswordMutation } from '@/services/accountServices';
import { useMemo } from 'react';
import jwtUtils from '@/utils/jwtUtils';
import { toastSuccess } from '@/utils/toastUtils';

const fields: Array<IInputProps> = [
  { ...APP_INPUT_FIELDS.INPUT_OLD_PASSWORD },
  { ...APP_INPUT_FIELDS.INPUT_PASSWORD },
  { ...APP_INPUT_FIELDS.INPUT_PASSWORD_CONFIRM },
];

const FormUpdatePassword = () => {
  const { session } = useSession();

  const userTokenInfo = useMemo(() => {
    const info = jwtUtils.userJwtDecode(session ?? '');
    return info;
  }, [session]);

  const [updatePassword, { isLoading: updatePasswordIsLoading }] =
    useUpdatePasswordMutation();
  const defaultValues = {};

  const handleSubmit = async (values: Record<string, any>) => {
    console.log('Password change values', values);

    try {
      const tempPasswordDTO: IPassordUpdateDTO = {
        userId: userTokenInfo.Id,
        password: values?.oldPassword,
        newPassword: values?.password,
        confirmNewPassword: values?.confirmPassword,
      };
      const result = await updatePassword(tempPasswordDTO);
      toastSuccess('Password updated successfully.');
      console.log('result', result);
    } catch (error) {
      console.log('Error updateUserInformations', error);
    }
  };

  // @todo create custom scrollwiev
  return (
    <FormStyled
      isLoading={updatePasswordIsLoading}
      defaultValues={defaultValues}
      fields={fields}
      onSubmit={handleSubmit}
      submitKey="Save"
    />
  );
};

export default FormUpdatePassword;
