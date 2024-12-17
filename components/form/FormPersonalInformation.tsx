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
  { ...APP_INPUT_FIELDS.INPUT_FISTNAME },
  { ...APP_INPUT_FIELDS.INPUT_LASTNAME },
  { ...APP_INPUT_FIELDS.INPUT_SELECT_LANGUAGE },
];

const FormPersonalInformation = () => {
  const { session } = useSession();
  const [updateUserInformations, { isLoading: updateInformationIsLoading }] =
    usePutUpdateUserInformationsMutation();

  const { data: currentUserData } = useGetCurrentUserInformationQuery();

  const userTokenInfo = useMemo(() => {
    const info = jwtUtils.userJwtDecode(session ?? '');
    return info;
  }, [session]);

  const defaultValues = {
    firstName: currentUserData?.firstName || userTokenInfo?.Name,
    lastName: currentUserData?.lastName || userTokenInfo?.Surname,
    language: currentUserData?.language,
  };

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      const tempUserInfo = {
        id: userTokenInfo.Id,
        firstName: values?.firstName,
        lastName: values?.lastName,
        language: values?.language?.value,
      };
      const result = await updateUserInformations(tempUserInfo as any);
      toastSuccess('information updated successfully.');
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

export default FormPersonalInformation;
