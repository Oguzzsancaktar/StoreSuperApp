import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { router } from "expo-router";

import CardAlternativeAuth from "@/components/cards/auth/CardAlternativeAuth";
import { InnerCommonContainer } from "@/components/containers";
import ScreenWrapperContainer from "@/components/containers/ScreenWrapperContainer";
import { FormStyled, FormWizard } from "@/components/form";
import { TextStyled } from "@/components/typography";
import APP_INPUT_FIELDS from "@/constants/APP_INPUT_FIELDS";
import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import IRegisterDTO from "@/interfaces/account/IRegisterDTO";
import { IInputProps } from "@/interfaces/app";
import { useRegisterAccountMutation } from "@/services/accountServices";
import { toastSuccess } from "@/utils/toastUtils";

const fields: Array<IInputProps> = [
  { ...APP_INPUT_FIELDS.INPUT_EMAIL },
  { ...APP_INPUT_FIELDS.INPUT_PASSWORD },
  { ...APP_INPUT_FIELDS.INPUT_PASSWORD_CONFIRM },
  { ...APP_INPUT_FIELDS.INPUT_EULA_AGREEMENT },
];

const SignupScreen = () => {
  const { t } = useTranslation();

  const [createAccount, { isLoading: registerIsLoading }] =
    useRegisterAccountMutation();

  const [registerValues, setRegisterValues] = useState<IRegisterDTO>();

  const handleSubmit = async (values: IRegisterDTO) => {
    try {
      console.log("values", values, registerValues);
      const result = await createAccount(values);
      toastSuccess(
        t("toast.confirmationEmailSendSuccessfullyPleaseConfirmYourAccount"),
      );
      setTimeout(() => {
        router.push(APP_ROUTES.PUBLIC.UNAUTHORIZED.LOGIN);
      }, 2000);
    } catch (error) {
      console.log("Error when create account");
    }
  };

  return (
    <ScreenWrapperContainer showGoBack={true}>
      <InnerCommonContainer>
        <View style={{ marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp5 }}>
          <TextStyled
            fontSize="h4"
            fontWeight="bold"
            customColor="grayScale900"
          >
            {t("register.title")}
          </TextStyled>
          <TextStyled
            fontSize="md"
            fontWeight="regular"
            customColor="grayScale600"
          >
            {t("register.description")}
          </TextStyled>
        </View>
        <FormStyled
          values={registerValues as Record<string, any>}
          setValues={
            setRegisterValues as React.Dispatch<
              React.SetStateAction<Record<string, any>>
            >
          }
          submitKey={t("common.register")}
          isLoading={registerIsLoading}
          fields={fields}
          onSubmit={handleSubmit}
        />

        <CardAlternativeAuth authType={"REGISTER"} />
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default SignupScreen;
