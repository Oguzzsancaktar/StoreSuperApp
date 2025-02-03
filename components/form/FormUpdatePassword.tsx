import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import APP_INPUT_FIELDS from "@/constants/APP_INPUT_FIELDS";
import { useAppAuthSession } from "@/contexts/AuthContext";
import IPassordUpdateDTO from "@/interfaces/account/IPassordUpdateDTO";
import { IInputProps } from "@/interfaces/app";
import { useUpdatePasswordMutation } from "@/services/accountServices";
import { toastSuccess } from "@/utils/toastUtils";

import { FormStyled } from ".";

const fields: Array<IInputProps> = [
  { ...APP_INPUT_FIELDS.INPUT_OLD_PASSWORD },
  { ...APP_INPUT_FIELDS.INPUT_PASSWORD },
  { ...APP_INPUT_FIELDS.INPUT_PASSWORD_CONFIRM },
];

const FormUpdatePassword = () => {
  const { userTokenInfo } = useAppAuthSession();
  const { t } = useTranslation();

  const [updatePassword, { isLoading: updatePasswordIsLoading }] =
    useUpdatePasswordMutation();
  const defaultValues = {};

  const handleSubmit = async (values: Record<string, any>) => {
    console.log("Password change values", values);

    try {
      const tempPasswordDTO: IPassordUpdateDTO = {
        userId: userTokenInfo?.Id || "",
        password: values?.oldPassword,
        newPassword: values?.password,
        confirmNewPassword: values?.confirmPassword,
      };
      const result = await updatePassword(tempPasswordDTO);
      toastSuccess("Password updated successfully.");
      console.log("result", result);
    } catch (error) {
      console.log("Error updateUserInformations", error);
    }
  };

  return (
    <FormStyled
      isLoading={updatePasswordIsLoading}
      values={defaultValues}
      fields={fields}
      onSubmit={handleSubmit}
      submitKey={t("common.buttons.save")}
    />
  );
};

export default FormUpdatePassword;
