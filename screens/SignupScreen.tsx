import React from 'react';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { InnerCommonContainer } from '@/components/containers';
import useCommonStyles from '@/hooks/useCommonStyles';
import { SignupForm } from '@/components/form';
import { SignupFormStepProps } from '@/components/form/SignupForm';
import SRegisterIllustration from '@/components/svg/illustrations/SRegisterIllustration';
import { TextStyled } from '@/components/typography';
import { View } from 'react-native';

const SignupScreen = () => {
  const commonStyles = useCommonStyles();

  const steps: SignupFormStepProps[] = [
    {
      id: 'STEP_1',
      fields: [
        {
          label: 'First name',
          name: 'firstname',
          placeholder: 'Your email address',
          type: 'text',
        },
        {
          label: 'Password',
          name: 'password',
          placeholder: 'Your password',
          type: 'password',
        },
        {
          label: 'Password Confirm',
          name: 'password_confirm',
          placeholder: 'Confirm your password',
          type: 'password',
        },
      ],
    },
  ];
  const defaultValues = { COUNTRY: 'Estonia' };

  const handleSubmit = (values: Record<string, any>) => {
    console.log(values);
  };

  return (
    <ScreenWrapperContainer showGoBack={true}>
      <View>
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
        <SignupForm
          steps={steps}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        />
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default SignupScreen;
