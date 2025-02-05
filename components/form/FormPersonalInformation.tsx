import { useTranslation } from "react-i18next";

import apiClient from "@/config/axiosInstance";
import APP_INPUT_FIELDS from "@/constants/APP_INPUT_FIELDS";
import APP_STORAGE_KEYS from "@/constants/APP_STORAGE_KEYS";
import { useAppAuthSession } from "@/contexts/AuthContext";
import { useStorageState } from "@/hooks/useStorageState";
import { IInputProps } from "@/interfaces/app";
import ETranslationLanguages from "@/interfaces/enums/ETranslationLanguages";
import {
  accountApiSlice,
  useGetCurrentUserInformationQuery,
  usePutUpdateUserInformationsMutation,
} from "@/services/accountServices";
import { resetApiState } from "@/services/apiTags";
import { chatApiSlice as chatApiSliceFromChatServices } from "@/services/chatServices";
import { listingFilterApiSlice as listingFilterApiSliceFromListingFilterServices } from "@/services/listingFilterServices";
import { listingApiSlice } from "@/services/listingServices";
import { store } from "@/store/store";
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

      apiClient.defaults.headers["Accept-Language"] = values?.language.value;

      const result = await updateUserInformations(tempUserInfo as any);

      // Complete reset of API state
      store.dispatch(resetApiState());

      // Force refetch all queries
      store.dispatch(accountApiSlice.util.resetApiState());
      store.dispatch(listingApiSlice.util.resetApiState());
      store.dispatch(
        listingFilterApiSliceFromListingFilterServices.util.resetApiState(),
      );
      store.dispatch(chatApiSliceFromChatServices.util.resetApiState());

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
