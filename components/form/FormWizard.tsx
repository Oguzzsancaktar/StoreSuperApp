import { ReactNode, useMemo, useState } from 'react';
import FormStyled from './FormStyled';

import { IInputProps } from '@/interfaces/app';
import { View } from 'react-native';
import { TextStyled } from '../typography';
import { InnerCommonContainer } from '../containers';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import CardListingCategoryItem from '../cards/listing/CardListingCategoryItem';
import CardListingCategories from '../cards/listing/CardListingCategories';
import IListingCategory from '@/interfaces/listing/IListingCategory';
import useCommonStyles from '@/hooks/useCommonStyles';

export interface IFormWizardStepProps {
  id: string;
  fields: Array<IInputProps>;
  customStep?: ReactNode;
  stepTitle?: string;
  stepDescription?: string;
}

export interface IFormWizardProps {
  steps: IFormWizardStepProps[];
  defaultValues: Record<string, any>;
  values: Record<string, any>;
  setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  onSubmit(values: Record<string, any>): void;
}

const FormWizard: React.FC<Readonly<IFormWizardProps>> = ({
  steps,
  defaultValues,
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
    <InnerCommonContainer>
      <View
        style={[
          commonStyles.flexStyles.colBetween,
          {
            flex: 1,
            width: '100%',
          },
        ]}
      >
        <View
          style={[
            commonStyles.flexStyles.rowBetween,
            {
              width: '100%',
              marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp4,
            },
          ]}
        >
          <View></View>
          <View style={[commonStyles.flexStyles.rowStart, {}]}>
            <TextStyled
              fontSize="lg"
              fontWeight="medium"
              customColor="grayScale900"
            >
              {activeStepIndex + 1 + ''}
            </TextStyled>
            <TextStyled
              fontSize="lg"
              fontWeight="medium"
              customColor="grayScale400"
            >
              /{steps.length + ''}
            </TextStyled>
          </View>
        </View>

        {(activeStep?.stepTitle || activeStep?.stepDescription) && (
          <View style={{ marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp5 }}>
            <TextStyled fontSize="h4" fontWeight="bold" customColor="primary">
              {activeStep?.stepTitle as string}
            </TextStyled>
            <TextStyled fontSize="md" fontWeight="semibold">
              {activeStep?.stepDescription as string}
            </TextStyled>
          </View>
        )}

        {activeStep?.customStep && activeStep.customStep}

        <FormStyled
          showBackButton={!!activeStepIndex}
          onBack={handleBackStep}
          key={activeStep.id} // IMPORTANT! Keep each form instance separate
          fields={activeStep.fields}
          defaultValues={{ ...defaultValues, ...values }}
          onSubmit={handleNextStep}
          isLastStep={isLastStep}
          isCurrentCustom={!!activeStep.customStep}
        />
      </View>
    </InnerCommonContainer>
  );
};

export default FormWizard;
