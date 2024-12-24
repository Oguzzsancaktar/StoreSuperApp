import { useState } from "react";

import CardAlternativeAuth from "@/components/cards/auth/CardAlternativeAuth";
import { InnerCommonContainer } from "@/components/containers";
import ScreenWrapperContainer from "@/components/containers/ScreenWrapperContainer";
import { FormWizard } from "@/components/form";
import { IFormWizardStepProps } from "@/components/form/FormWizard";
import APP_INPUT_FIELDS from "@/constants/APP_INPUT_FIELDS";
import { useAppAuthSession } from "@/contexts/AuthContext";
import ILoginDTO from "@/interfaces/account/ILoginDTO";
import { useLoginAccountMutation } from "@/services/accountServices";
import { toastError } from "@/utils/toastUtils";

const steps: IFormWizardStepProps[] = [
  {
    id: "STEP_1",
    stepTitle: "List & Find with ease",
    stepDescription:
      "Login and find cool things in your area or sell your own stuff.",
    fields: [
      { ...APP_INPUT_FIELDS.INPUT_EMAIL },
      { ...APP_INPUT_FIELDS.INPUT_PASSWORD },
    ],
  },
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
      <FormWizard
        submitKey="Login"
        isLoading={loginAccountIsLoading}
        values={values as Record<string, any>}
        setValues={
          setValues as React.Dispatch<React.SetStateAction<Record<string, any>>>
        }
        steps={steps}
        onSubmit={handleSubmit}
      />

      <CardAlternativeAuth authType={"LOGIN"} />
    </ScreenWrapperContainer>
  );
};

export default LoginScreen;
