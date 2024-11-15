import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { InnerCommonContainer } from '@/components/containers';
import useCommonStyles from '@/hooks/useCommonStyles';
import { FormWizard } from '@/components/form';
import { IFormWizardStepProps } from '@/components/form/FormWizard';
import { TextStyled } from '@/components/typography';
import { View } from 'react-native';
import SLoginIllustration from '@/components/svg/illustrations/SLoginIllustration';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import APP_INPUT_FIELDS from '@/constants/APP_INPUT_FIELDS';
import { useState } from 'react';
import ILoginDTO from '@/interfaces/account/ILoginDTO';
import { useLoginAccountMutation } from '@/services/accountServices';
import { useSession } from '@/contexts/AuthContext';

const steps: IFormWizardStepProps[] = [
  {
    id: 'STEP_1',
    fields: [
      { ...APP_INPUT_FIELDS.INPUT_EMAIL },
      { ...APP_INPUT_FIELDS.INPUT_PASSWORD },
    ],
  },
];

const LoginScreen = () => {
  const [createAccount] = useLoginAccountMutation();
  const { signIn } = useSession();

  const [values, setValues] = useState<ILoginDTO>();

  const defaultValues = {
    email: 'sipsebatra@gufum.com',
    password: 'Dotnet123.',
  };

  const handleSubmit = async (values: ILoginDTO) => {
    console.log(values);

    try {
      const result = await createAccount(values);
      if (result?.data) {
        signIn(result.data);
      } else {
        console.log('xxxxxx----- create account ------ error');
      }
    } catch (error) {
      console.log('Error when create account');
    }
    console.log(values);
  };

  return (
    <ScreenWrapperContainer showGoBack={true}>
      <View style={{ paddingTop: APP_STYLE_VALUES.SPACE_SIZES.sp5 }}>
        <View
          style={{ maxWidth: APP_STYLE_VALUES.MAX_WIDTH.lg, margin: 'auto' }}
        >
          <TextStyled fontSize="h4" fontWeight="bold" customColor="primary">
            With Setuka24 you list with Ease & find with purpose
          </TextStyled>
          <TextStyled fontSize="md" fontWeight="semibold">
            Login into your account, to find cool things in your area or sell
            your own stuff.
          </TextStyled>
        </View>

        <SLoginIllustration />
      </View>

      <InnerCommonContainer>
        <FormWizard
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
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default LoginScreen;
