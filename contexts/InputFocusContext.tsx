import React, { createContext, useContext, useRef } from 'react';

type InputFocusContextType = {
  registerInput: (ref: React.RefObject<any>) => void;
  unregisterInput: (ref: React.RefObject<any>) => void;
  blurAllInputs: () => void;
};

const InputFocusContext = createContext<InputFocusContextType | null>(null);

export const InputFocusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const inputRefs = useRef<React.RefObject<any>[]>([]);

  const registerInput = (ref: React.RefObject<any>) => {
    if (!inputRefs.current.includes(ref)) {
      inputRefs.current.push(ref);
    }
  };

  const unregisterInput = (ref: React.RefObject<any>) => {
    inputRefs.current = inputRefs.current.filter((r) => r !== ref);
  };

  const blurAllInputs = () => {
    inputRefs.current.forEach((ref) => {
      ref.current?.blur();
    });
  };

  return (
    <InputFocusContext.Provider
      value={{ registerInput, unregisterInput, blurAllInputs }}
    >
      {children}
    </InputFocusContext.Provider>
  );
};

export const useInputFocus = (): InputFocusContextType => {
  const context = useContext(InputFocusContext);
  if (!context) {
    throw new Error('useInputFocus must be used within InputFocusProvider');
  }
  return context;
};
