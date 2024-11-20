import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { useInputFocus } from '@/contexts/InputFocusContext';

const DismissKeyboardWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { blurAllInputs } = useInputFocus();

  const dismissKeyboardAndBlurInputs = () => {
    // blurAllInputs(); // Tüm inputlardan focus'u kaldır
    // Keyboard.dismiss(); // Klavyeyi kapat
  };

  return (
    // <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
    <TouchableWithoutFeedback
      accessible={false}
      onPress={dismissKeyboardAndBlurInputs}
    >
      <View style={styles.container}>{children}</View>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DismissKeyboardWrapper;
