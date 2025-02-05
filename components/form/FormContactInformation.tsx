import { useTranslation } from "react-i18next";

import APP_INPUT_FIELDS from "@/constants/APP_INPUT_FIELDS";
import { useAppAuthSession } from "@/contexts/AuthContext";
import { IInputProps } from "@/interfaces/app";
import {
  useGetCurrentUserInformationQuery,
  usePutUpdateUserInformationsMutation,
  useUpdateUserContactPrefferencesMutation,
} from "@/services/accountServices";
import { toastSuccess } from "@/utils/toastUtils";

import { FormStyled } from ".";

const FormContactInformation = () => {
  const { userTokenInfo } = useAppAuthSession();
  const [updateUserInformations, { isLoading: updateInformationIsLoading }] =
    usePutUpdateUserInformationsMutation();

  const { data: currentUserData } = useGetCurrentUserInformationQuery();

  const [
    updateUserContactPrefferences,
    {
      data: updateContactPrefferencesData,
      isLoading: updateContactPrefferencesIsLoading,
    },
  ] = useUpdateUserContactPrefferencesMutation();

  console.log("updateContactPrefferencesData", updateContactPrefferencesData);

  const { t } = useTranslation();

  const fields: Array<IInputProps> = [
    { ...APP_INPUT_FIELDS.INPUT_EMAIL },
    { ...APP_INPUT_FIELDS.INPUT_PHONE },
    {
      name: "showEmailOnProfile",
      type: "switch",
      label: t("input.showEmailOnProfile.label"),
      required: false,
    },
    {
      name: "showPhoneNumberOnProfile",
      type: "switch",
      label: t("input.showPhoneNumberOnProfile.label"),
      required: false,
    },
  ];

  const defaultValues = {
    phoneNumber: currentUserData?.phoneNumber,
    email: currentUserData?.email,
    showEmailOnProfile: currentUserData?.showEmailOnProfile,
    showPhoneNumberOnProfile: currentUserData?.showPhoneNumberOnProfile,
  };

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      const tempUserInfo = {
        id: userTokenInfo?.Id,
        phoneNumber: values?.phoneNumber,
        email: values?.email,
      };

      const cpResult = await updateUserContactPrefferences({
        showEmailOnProfile: values?.showEmailOnProfile,
        showPhoneNumberOnProfile: values?.showPhoneNumberOnProfile,
      });

      console.log("cpResult", cpResult);
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
