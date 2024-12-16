import { FormStyled } from '.';
import APP_INPUT_FIELDS from '@/constants/APP_INPUT_FIELDS';
import { IInputProps } from '@/interfaces/app';
import {
  useGetCurrentUserInformationQuery,
  usePutUpdateUserInformationsMutation,
} from '@/services/accountServices';
import { useSession } from '@/contexts/AuthContext';
import jwtUtils from '@/utils/jwtUtils';
import { useMemo } from 'react';
import { toastSuccess } from '@/utils/toastUtils';

const fields: Array<IInputProps> = [
  { ...APP_INPUT_FIELDS.INPUT_EMAIL },
  { ...APP_INPUT_FIELDS.INPUT_PHONE },
];

const FormContactInformation = () => {
  const { session } = useSession();
  const [updateUserInformations, { isLoading: updateInformationIsLoading }] =
    usePutUpdateUserInformationsMutation();

  const { data: currentUserData } = useGetCurrentUserInformationQuery();

  const userTokenInfo = useMemo(() => {
    const info = jwtUtils.userJwtDecode(session ?? '');
    return info;
  }, [session]);

  const defaultValues = {
    phoneNumber: currentUserData?.phoneNumber,
    email: currentUserData?.email,
  };

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      const tempUserInfo = {
        id: userTokenInfo.Id,
        phoneNumber: values?.phoneNumber,
        email: values?.email,
      };
      const result = await updateUserInformations(tempUserInfo as any);
      toastSuccess('Informations updated successfully.');
      console.log('result', result);
    } catch (error) {
      console.log('Error updateUserInformations', error);
    }
  };

  // @todo create custom scrollwiev
  return (
    <FormStyled
      isLoading={updateInformationIsLoading}
      defaultValues={defaultValues}
      fields={fields}
      onSubmit={handleSubmit}
      submitKey="Save"
    />
  );
};

export default FormContactInformation;
