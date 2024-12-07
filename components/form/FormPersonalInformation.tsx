import React, { useMemo, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { FormWizard } from '.';
import { IFormWizardStepProps } from './FormWizard';
import { useDrawerState } from '@/contexts/DrawerContext';
import APP_INPUT_FIELDS from '@/constants/APP_INPUT_FIELDS';
import { TextStyled } from '../typography';

const FormPersonalInformation = () => {
  const { isDrawerOpen, toggleDrawer } = useDrawerState();

  const [values, setValues] = useState<Record<string, any>>({});

  const steps: IFormWizardStepProps[] = [
    {
      id: 'STEP_1',
      fields: [
        { ...APP_INPUT_FIELDS.INPUT_FISTNAME },
        { ...APP_INPUT_FIELDS.INPUT_LASTNAME },
        { ...APP_INPUT_FIELDS.INPUT_BIRTHDAY },
      ],
    },
  ];

  const defaultValues = {};

  const handleSubmit = async (values: Record<string, any>) => {
    toggleDrawer();
  };

  // @todo create custom scrollwiev
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}
      onStartShouldSetResponder={() => true}
    >
      <ScrollView
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <FormWizard
          values={values}
          setValues={setValues}
          steps={steps}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        />
      </ScrollView>
    </View>
  );
};

export default FormPersonalInformation;
