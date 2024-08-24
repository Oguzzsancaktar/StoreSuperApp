import React from 'react';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { InnerCommonContainer } from '@/components/containers';
import useCommonStyles from '@/hooks/useCommonStyles';
import { SignupForm } from '@/components/form';
import { FormWizardStepProps } from '@/components/form/SignupForm';

const SignupScreen = () => {
  const commonStyles = useCommonStyles();

  const steps: FormWizardStepProps[] = [
    { id: 'STEP_1', fields: [{ name: 'FIRSTNAME' }, { name: 'LASTNAME' }] },
    { id: 'STEP_2', fields: [{ name: 'COUNTRY' }, { name: 'ADDRESS' }] },
  ];
  const defaultValues = { COUNTRY: 'Estonia' };

  const handleSubmit = (values: Record<string, any>) => {
    console.log(values);
  };

  return (
    <ScreenWrapperContainer>
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
