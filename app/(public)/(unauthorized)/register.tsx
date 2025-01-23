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
import IRegisterDTO from "@/interfaces/account/IRegisterDTO";
import { IInputProps } from "@/interfaces/app";
import { useRegisterAccountMutation } from "@/services/accountServices";

const SignupScreen = () => {
  const [createAccount, { isLoading: registerIsLoading }] =
    useRegisterAccountMutation();

  const [registerValues, setRegisterValues] = useState<IRegisterDTO>();

  const fields: Array<IInputProps> = [
    { ...APP_INPUT_FIELDS.INPUT_EMAIL },
    { ...APP_INPUT_FIELDS.INPUT_PASSWORD },
    { ...APP_INPUT_FIELDS.INPUT_PASSWORD_CONFIRM },
  ];

  const defaultValues = {};

  const handleSubmit = async (values: IRegisterDTO) => {
    try {
      console.log("values", values, registerValues);
      const result = await createAccount(values);
      console.log("result111", result.data);
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
            Create your account
          </TextStyled>
          <TextStyled
            fontSize="md"
            fontWeight="regular"
            customColor="grayScale600"
          >
            Find cool things in your area or sell your own stuff.
          </TextStyled>
        </View>
        <FormStyled
          values={registerValues as Record<string, any>}
          setValues={
            setRegisterValues as React.Dispatch<
              React.SetStateAction<Record<string, any>>
            >
          }
          submitKey="Register"
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
