import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { InnerCommonContainer } from '@/components/containers';
import { FormWizard } from '@/components/form';
import { IFormWizardStepProps } from '@/components/form/FormWizard';
import SRegisterIllustration from '@/components/svg/illustrations/SRegisterIllustration';
import { TextStyled } from '@/components/typography';
import { View } from 'react-native';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useState } from 'react';
import { useRegisterAccountMutation } from '@/services/accountServices';
import IRegisterDTO from '@/interfaces/account/IRegisterDTO';
import APP_INPUT_FIELDS from '@/constants/APP_INPUT_FIELDS';

const SignupScreen = () => {
  const [createAccount] = useRegisterAccountMutation();

  const [values, setValues] = useState<IRegisterDTO>();

  const steps: IFormWizardStepProps[] = [
    {
      id: 'STEP_1',
      fields: [
        { ...APP_INPUT_FIELDS.INPUT_EMAIL },
        { ...APP_INPUT_FIELDS.INPUT_PASSWORD },
        { ...APP_INPUT_FIELDS.INPUT_PASSWORD_CONFIRM },
      ],
    },
  ];
  const defaultValues = {};

  const handleSubmit = async (values: IRegisterDTO) => {
    values.language = 'en-US';

    try {
      const result = await createAccount(values);
      console.log('result111', result.data);
    } catch (error) {
      console.log('Error when create account');
    }
  };

  return (
    <ScreenWrapperContainer showGoBack={true}>
      <View style={{ paddingTop: APP_STYLE_VALUES.SPACE_SIZES.sp5 }}>
        <TextStyled fontSize="h4" fontWeight="bold" customColor="primary">
          Create your account
        </TextStyled>
        <TextStyled fontSize="md" fontWeight="semibold">
          Create an account to find cool things in your area or sell your own
          stuff.
        </TextStyled>
        <SRegisterIllustration />
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

export default SignupScreen;
