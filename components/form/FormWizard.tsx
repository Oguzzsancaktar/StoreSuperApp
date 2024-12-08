import { ReactNode, useMemo, useState } from 'react';
import FormStyled from './FormStyled';
import { IInputProps } from '@/interfaces/app';
import { View } from 'react-native';
import { TextStyled } from '../typography';
import { InnerCommonContainer } from '../containers';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import useCommonStyles from '@/hooks/useCommonStyles';
import { router } from 'expo-router';
import ScreenWrapperContainer from '../containers/ScreenWrapperContainer';
import WizardStepIndicator from '../wizard/WizardStepIndicator';

export interface IFormWizardStepProps {
  id: string;
  fields: Array<IInputProps>;
  customStep?: ReactNode;
  stepTitle?: string;
  stepDescription?: string;
}

export interface IFormWizardProps {
  submitKey?: string;
  steps: IFormWizardStepProps[];
  isNextDisabled?: boolean;
  defaultValues: Record<string, any>;
  values: Record<string, any>;
  isLoading?: boolean;

  isTabBarActive?: boolean;
  setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  onSubmit(values: Record<string, any>): void;
}

const FormWizard: React.FC<Readonly<IFormWizardProps>> = ({
  submitKey = 'Submit',
  isNextDisabled = false,
  steps,
  defaultValues,
  isTabBarActive,
  isLoading,
  onSubmit,
  setValues,
  values,
}) => {
  const commonStyles = useCommonStyles();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = useMemo(
    () => steps[activeStepIndex],
    [activeStepIndex, steps]
  );
  const isLastStep = useMemo(
    () => activeStepIndex === steps.length - 1,
    [activeStepIndex, steps.length]
  );

  // @todo goback loss current step data
  // solve with input blur or select save at same time

  const goPrevStep = (stepValues?: Record<string, any>) => {
    const newValues = { ...values, ...stepValues };
    setValues(() => newValues);

    if (activeStepIndex === 0) {
      return router.back();
    }
    setActiveStepIndex((index) => (index -= 1));
  };

  const goNextStep = () => {
    setActiveStepIndex((index) => (index += 1));
  };

  // @todo need to use this for go back but instance not here
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
    <ScreenWrapperContainer
      showGoBack={steps.length > 1}
      customGoBackEvent={goPrevStep}
      isTabBarActive={isTabBarActive}
      rightElement={
        steps.length > 1 ? (
          <WizardStepIndicator
            activeIndex={activeStepIndex}
            stepSize={steps.length}
          />
        ) : null
      }
    >
      <InnerCommonContainer>
        <View
          style={[
            commonStyles.flexStyles.colBetween,
            {
              flex: 1,
              height: '100%',
              width: '100%',
            },
          ]}
        >
          {(activeStep?.stepTitle || activeStep?.stepDescription) && (
            <View style={{ marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp5 }}>
              <TextStyled
                fontSize="h4"
                fontWeight="bold"
                customColor="grayScale900"
              >
                {activeStep?.stepTitle as string}
              </TextStyled>
              <TextStyled
                fontSize="md"
                fontWeight="regular"
                customColor="grayScale600"
              >
                {activeStep?.stepDescription as string}
              </TextStyled>
            </View>
          )}

          {activeStep?.customStep && activeStep.customStep}

          <FormStyled
            submitKey={submitKey}
            isLoading={isLoading}
            isNextDisabled={isNextDisabled}
            key={activeStep.id}
            fields={activeStep.fields}
            defaultValues={{ ...defaultValues, ...values }}
            onSubmit={handleNextStep}
            isLastStep={isLastStep}
            isCurrentCustom={!!activeStep.customStep}
          />
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default FormWizard;
