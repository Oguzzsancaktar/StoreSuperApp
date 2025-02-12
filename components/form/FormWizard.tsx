import { ReactNode, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { router } from "expo-router";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";
import { IInputProps } from "@/interfaces/app";

import { InnerCommonContainer } from "../containers";
import ScreenWrapperContainer from "../containers/ScreenWrapperContainer";
import { TextStyled } from "../typography";
import WizardStepIndicator from "../wizard/WizardStepIndicator";
import FormStyled from "./FormStyled";

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
  values: Record<string, any>;
  isLoading?: boolean;
  showReset?: boolean;
  isTabBarActive?: boolean;
  setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  onSubmit(values: Record<string, any>): void;
}

const FormWizard: React.FC<Readonly<IFormWizardProps>> = ({
  submitKey = "Submit",
  isNextDisabled = false,
  steps,
  isTabBarActive,
  isLoading,
  onSubmit,
  setValues,
  showReset,
  values,
}) => {
  const { t } = useTranslation();

  const finalSubmitKey =
    submitKey === "Submit" ? t("common.buttons.submit") : submitKey;

  const { commonStyles } = useAppStyles();

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = useMemo(
    () => steps[activeStepIndex],
    [activeStepIndex, steps],
  );

  const isLastStep = useMemo(
    () => activeStepIndex === steps.length - 1,
    [activeStepIndex, steps.length],
  );

  const goPrevStep = () => {
    if (activeStepIndex === 0) {
      return router.back();
    }
    setActiveStepIndex((index) => (index -= 1));
  };

  const goNextStep = () => {
    setActiveStepIndex((index) => (index += 1));
  };

  const handleNextStep = (formStepValues: Record<string, any>) => {
    console.log("Next values", formStepValues, values);
    if (isLastStep) {
      onSubmit(values);
    } else {
      setValues({ ...values, ...formStepValues });
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
              height: "100%",
              width: "100%",
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
            values={values}
            showReset={showReset}
            submitKey={finalSubmitKey}
            isLoading={isLoading}
            isNextDisabled={isNextDisabled}
            key={activeStep.id}
            fields={activeStep.fields}
            onSubmit={handleNextStep}
            isLastStep={isLastStep}
            isCurrentCustom={!!activeStep.customStep}
            setValues={setValues}
          />
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default FormWizard;
