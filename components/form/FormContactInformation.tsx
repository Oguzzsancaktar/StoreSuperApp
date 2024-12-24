import APP_INPUT_FIELDS from "@/constants/APP_INPUT_FIELDS";
import { useAppAuthSession } from "@/contexts/AuthContext";
import { IInputProps } from "@/interfaces/app";
import {
  useGetCurrentUserInformationQuery,
  usePutUpdateUserInformationsMutation,
} from "@/services/accountServices";
import { toastSuccess } from "@/utils/toastUtils";

import { FormStyled } from ".";

const fields: Array<IInputProps> = [
  { ...APP_INPUT_FIELDS.INPUT_EMAIL },
  { ...APP_INPUT_FIELDS.INPUT_PHONE },
];

const FormContactInformation = () => {
  const { userTokenInfo } = useAppAuthSession();
  const [updateUserInformations, { isLoading: updateInformationIsLoading }] =
    usePutUpdateUserInformationsMutation();

  const { data: currentUserData } = useGetCurrentUserInformationQuery();

  const defaultValues = {
    phoneNumber: currentUserData?.phoneNumber,
    email: currentUserData?.email,
  };

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      const tempUserInfo = {
        id: userTokenInfo?.Id,
        phoneNumber: values?.phoneNumber,
        email: values?.email,
      };
      const result = await updateUserInformations(tempUserInfo as any);
      toastSuccess("information updated successfully.");
      console.log("result", result);
    } catch (error) {
      console.log("Error updateUserInformations", error);
    }
  };

  return (
    <FormStyled
      values={defaultValues}
      isLoading={updateInformationIsLoading}
      fields={fields}
      onSubmit={handleSubmit}
      submitKey="Save"
    />
  );
};

export default FormContactInformation;
