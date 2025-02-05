import { useTranslation } from "react-i18next";

import apiClient from "@/config/axiosInstance";
import APP_INPUT_FIELDS from "@/constants/APP_INPUT_FIELDS";
import APP_STORAGE_KEYS from "@/constants/APP_STORAGE_KEYS";
import { useAppAuthSession } from "@/contexts/AuthContext";
import { useStorageState } from "@/hooks/useStorageState";
import { IInputProps } from "@/interfaces/app";
import ETranslationLanguages from "@/interfaces/enums/ETranslationLanguages";
import {
  useGetCurrentUserInformationQuery,
  usePutUpdateUserInformationsMutation,
} from "@/services/accountServices";
import { changeLanguage } from "@/utils/i18nUtils";
import { toastSuccess } from "@/utils/toastUtils";

import { FormStyled } from ".";

const fields: Array<IInputProps> = [
  { ...APP_INPUT_FIELDS.INPUT_FISTNAME },
  { ...APP_INPUT_FIELDS.INPUT_LASTNAME },
  { ...APP_INPUT_FIELDS.INPUT_SELECT_LANGUAGE },
];

const FormPersonalInformation = () => {
  const { userTokenInfo } = useAppAuthSession();
  const [updateUserInformations, { isLoading: updateInformationIsLoading }] =
    usePutUpdateUserInformationsMutation();

  const { data: currentUserData } = useGetCurrentUserInformationQuery();

  const defaultValues = {
    firstName: currentUserData?.firstName || userTokenInfo?.Name,
    lastName: currentUserData?.lastName || userTokenInfo?.Surname,
    language: currentUserData?.language,
  };

  const { t } = useTranslation();

  const [
    [isPrefferedLanguageLoading, prefferedLanguage],
    setPrefferedLanguage,
  ] = useStorageState(APP_STORAGE_KEYS.PREFFRED_LANGUAGE);

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      const tempUserInfo = {
        id: userTokenInfo?.Id,
        firstName: values?.firstName,
        lastName: values?.lastName,
        language: values?.language?.value,
      };
      setPrefferedLanguage(values?.language?.value);
      changeLanguage(values?.language?.value);

      apiClient.defaults.headers["Accept-Language"] = values?.language._index;

      const result = await updateUserInformations(tempUserInfo as any);
      toastSuccess(t("toast.informationUpdatedSuccessfully"));
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
      submitKey={t("common.buttons.save")}
    />
  );
};

export default FormPersonalInformation;
