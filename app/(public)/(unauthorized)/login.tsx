import { useState } from "react";
import { View } from "react-native";

import CardAlternativeAuth from "@/components/cards/auth/CardAlternativeAuth";
import { InnerCommonContainer } from "@/components/containers";
import ScreenWrapperContainer from "@/components/containers/ScreenWrapperContainer";
import { FormStyled, FormWizard } from "@/components/form";
import { IFormWizardStepProps } from "@/components/form/FormWizard";
import { TextStyled } from "@/components/typography";
import APP_INPUT_FIELDS from "@/constants/APP_INPUT_FIELDS";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useAppAuthSession } from "@/contexts/AuthContext";
import ILoginDTO from "@/interfaces/account/ILoginDTO";
import { IInputProps } from "@/interfaces/app";
import { useLoginAccountMutation } from "@/services/accountServices";
import { toastError } from "@/utils/toastUtils";

const fields: Array<IInputProps> = [
  { ...APP_INPUT_FIELDS.INPUT_EMAIL },
  { ...APP_INPUT_FIELDS.INPUT_PASSWORD },
];

const LoginScreen = () => {
  const [loginAccount, { isLoading: loginAccountIsLoading }] =
    useLoginAccountMutation();
  const { signIn } = useAppAuthSession();

  const [values, setValues] = useState<ILoginDTO>();

  const handleSubmit = async (values: ILoginDTO) => {
    try {
      const result = await loginAccount(values);
      if (result?.data) {
        signIn(result.data);
      } else {
        toastError((result?.error as any)?.data?.detail);
      }
    } catch (error) {
      console.log("Error when login account", error);
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
            List & Find with ease
          </TextStyled>
          <TextStyled
            fontSize="md"
            fontWeight="regular"
            customColor="grayScale600"
          >
            Login and find cool things in your area or sell your own stuff.
          </TextStyled>
        </View>
        <FormStyled
          submitKey="Login"
          isLoading={loginAccountIsLoading}
          values={values as Record<string, any>}
          setValues={
            setValues as React.Dispatch<
              React.SetStateAction<Record<string, any>>
            >
          }
          fields={fields}
          onSubmit={handleSubmit}
        />

        <CardAlternativeAuth authType={"LOGIN"} />
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default LoginScreen;
