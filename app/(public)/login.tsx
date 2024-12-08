import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { InnerCommonContainer } from '@/components/containers';
import { FormWizard } from '@/components/form';
import { IFormWizardStepProps } from '@/components/form/FormWizard';
import APP_INPUT_FIELDS from '@/constants/APP_INPUT_FIELDS';
import { useState } from 'react';
import ILoginDTO from '@/interfaces/account/ILoginDTO';
import { useLoginAccountMutation } from '@/services/accountServices';
import { useSession } from '@/contexts/AuthContext';
import CardAlternativeAuth from '@/components/cards/auth/CardAlternativeAuth';
import { toastError } from '@/utils/toastUtils';
import { router } from 'expo-router';

const steps: IFormWizardStepProps[] = [
  {
    id: 'STEP_1',
    stepTitle: 'With Setuka24 you list with Ease & find with purpose',
    stepDescription:
      'Login into your account, to find cool things in your area or sell your own stuff.',
    fields: [
      { ...APP_INPUT_FIELDS.INPUT_EMAIL },
      { ...APP_INPUT_FIELDS.INPUT_PASSWORD },
    ],
  },
];

const LoginScreen = () => {
  const [loginAccount, { isLoading: loginAccountIsLoading }] =
    useLoginAccountMutation();
  const { signIn } = useSession();

  const [values, setValues] = useState<ILoginDTO>();

  const defaultValues =
    process.env.NODE_ENV === 'development'
      ? {
          email: 'sipsebatra@gufum.com',
          password: 'Dotnet123.',
        }
      : {
          email: '',
          password: '',
        };

  const handleSubmit = async (values: ILoginDTO) => {
    console.log(values);

    try {
      const result = await loginAccount(values);
      if (result?.data) {
        signIn(result.data);
      } else {
        toastError((result?.error as any)?.data?.detail);
      }
    } catch (error) {
      console.log('Error when login account', error);
    }
  };

  return (
    <ScreenWrapperContainer showGoBack={true}>
      <InnerCommonContainer>
        <FormWizard
          submitKey="Login"
          isLoading={loginAccountIsLoading}
          values={values as Record<string, any>}
          setValues={
            setValues as React.Dispatch<
              React.SetStateAction<Record<string, any>>
            >
          }
          steps={steps}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        />

        <CardAlternativeAuth authType={'LOGIN'} />
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default LoginScreen;
