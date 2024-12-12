import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { InnerCommonContainer } from '@/components/containers';
import { FormWizard } from '@/components/form';
import { IFormWizardStepProps } from '@/components/form/FormWizard';
import { TextStyled } from '@/components/typography';
import { Pressable, View } from 'react-native';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useState } from 'react';
import { useRegisterAccountMutation } from '@/services/accountServices';
import IRegisterDTO from '@/interfaces/account/IRegisterDTO';
import APP_INPUT_FIELDS from '@/constants/APP_INPUT_FIELDS';
import { useAppTheme } from '@/contexts/ThemeContext';
import useCommonStyles from '@/hooks/useCommonStyles';
import CardAlternativeAuth from '@/components/cards/auth/CardAlternativeAuth';

const SignupScreen = () => {
  const { theme } = useAppTheme();
  const commonStyles = useCommonStyles();

  const [createAccount, { isLoading: registerIsLoading }] =
    useRegisterAccountMutation();

  const [values, setValues] = useState<IRegisterDTO>();

  const steps: IFormWizardStepProps[] = [
    {
      id: 'STEP_1',
      stepTitle: 'Create your account',
      stepDescription:
        'Create an account to find cool things in your area or sell your own stuff.',
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
      console.log('result111', result.data);
    } catch (error) {
      console.log('Error when create account');
    }
  };

  return (
    <ScreenWrapperContainer showGoBack={true}>
      <View style={{ flex: 1, height: '100%' }}>
        <FormWizard
          values={values as Record<string, any>}
          setValues={
            setValues as React.Dispatch<
              React.SetStateAction<Record<string, any>>
            >
          }
          submitKey="Register"
          isLoading={registerIsLoading}
          steps={steps}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        />
      </View>

      <CardAlternativeAuth authType={'REGISTER'} />
    </ScreenWrapperContainer>
  );
};

export default SignupScreen;
