import { useState } from "react";
import { View } from "react-native";

import CardAlternativeAuth from "@/components/cards/auth/CardAlternativeAuth";
import ScreenWrapperContainer from "@/components/containers/ScreenWrapperContainer";
import { FormWizard } from "@/components/form";
import { IFormWizardStepProps } from "@/components/form/FormWizard";
import APP_INPUT_FIELDS from "@/constants/APP_INPUT_FIELDS";
import IRegisterDTO from "@/interfaces/account/IRegisterDTO";
import { useRegisterAccountMutation } from "@/services/accountServices";

const SignupScreen = () => {
  const [createAccount, { isLoading: registerIsLoading }] =
    useRegisterAccountMutation();

  const [values, setValues] = useState<IRegisterDTO>();

  const steps: IFormWizardStepProps[] = [
    {
      id: "STEP_1",
      stepTitle: "Create your account",
      stepDescription: "Find cool things in your area or sell your own stuff.",
      fields: [
        { ...APP_INPUT_FIELDS.INPUT_EMAIL },
        { ...APP_INPUT_FIELDS.INPUT_PASSWORD },
        { ...APP_INPUT_FIELDS.INPUT_PASSWORD_CONFIRM },
      ],
    },
  ];
  const defaultValues = {};

  const handleSubmit = async (values: IRegisterDTO) => {
    try {
      const result = await createAccount(values);
      console.log("result111", result.data);
    } catch (error) {
      console.log("Error when create account");
    }
  };

  return (
    <ScreenWrapperContainer showGoBack={true}>
      <FormWizard
        values={values as Record<string, any>}
        setValues={
          setValues as React.Dispatch<React.SetStateAction<Record<string, any>>>
        }
        submitKey="Register"
        isLoading={registerIsLoading}
        steps={steps}
        onSubmit={handleSubmit}
      />

      <CardAlternativeAuth authType={"REGISTER"} />
    </ScreenWrapperContainer>
  );
};

export default SignupScreen;
