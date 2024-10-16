import { useMemo, useState } from 'react';
import FormStyled from './FormStyled';
import { View } from 'react-native';

export interface FormWizardStepProps {
  id: string;
  fields: Array<{ name: string }>;
}

export interface FormWizardProps {
  steps: FormWizardStepProps[];
  defaultValues: Record<string, any>;
  onSubmit(values: Record<string, any>): void;
}

const FormWizard: React.FC<Readonly<FormWizardProps>> = (props) => {
  const { steps, defaultValues, onSubmit } = props;
  const [values, setValues] = useState<Record<string, any>>({});
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = useMemo(
    () => steps[activeStepIndex],
    [activeStepIndex, steps]
  );
  const isLastStep = useMemo(
    () => activeStepIndex === steps.length - 1,
    [activeStepIndex, steps.length]
  );

  const goPrevStep = () => {
    setActiveStepIndex((index) => (index -= 1));
  };

  const handleBackStep = (stepValues: Record<string, any>) => {
    const newValues = { ...values, ...stepValues };
    setValues(newValues);
    goPrevStep();
  };

  const goNextStep = () => {
    setActiveStepIndex((index) => (index += 1));
  };

  const handleNextStep = (stepValues: Record<string, any>) => {
    const newValues = { ...values, ...stepValues };
    setValues(newValues);

    if (isLastStep) {
      onSubmit(newValues);
    } else {
      goNextStep();
    }
  };

  if (!activeStep) {
    return null;
  }

  return (
    <View>
      <FormStyled
        showBackButton={!!activeStepIndex}
        onBack={handleBackStep}
        key={activeStep.id} // IMPORTANT! Keep each form instance separate
        fields={activeStep.fields}
        defaultValues={{ ...defaultValues, ...values }}
        onSubmit={handleNextStep}
      />
    </View>
  );
};

export default FormWizard;
