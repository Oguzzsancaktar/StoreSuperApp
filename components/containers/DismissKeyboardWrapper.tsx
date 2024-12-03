import React from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { useInputFocus } from '@/contexts/InputFocusContext';

const DismissKeyboardWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { blurAllInputs } = useInputFocus();

  const dismissKeyboardAndBlurInputs = () => {
    blurAllInputs(); // Tüm inputlardan focus'u kaldır
    Keyboard.dismiss(); // Klavyeyi kapat
  };

  // @todo manage with best practice
  return (
    // <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
    <TouchableWithoutFeedback
      accessible={false}
      onPress={dismissKeyboardAndBlurInputs}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        {children}
      </View>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

export default DismissKeyboardWrapper;
