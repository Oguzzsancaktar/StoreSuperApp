import { useEffect, useMemo, useRef, useState } from 'react';
import { IIconNames, IInputProps } from '@/interfaces/app';
import {
  View,
  TextInput,
  Pressable,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import useThemedStyles from '@/hooks/useThemedStyles';
import { useAppTheme } from '@/contexts/ThemeContext';
import { TextStyled } from '../typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import useCommonStyles from '@/hooks/useCommonStyles';
import { useInputFocus } from '@/contexts/InputFocusContext';
import InputStyled from './InputStyled';

interface IProps extends Omit<IInputProps, 'required' | 'type'> {
  handleFocus?: (val: boolean) => void;
  handleBlur?: (val: boolean) => void;
  onChange(value: number[]): void;
  value: number[];
}

const InputMinMaxStyled: React.FC<IProps> = ({
  placeholder,
  label,
  name,
  value,
  onChange,
  ...props
}) => {
  const inputRef = useRef<TextInput>(null);
  const { registerInput, unregisterInput } = useInputFocus();

  const commonStyles = useCommonStyles();

  const handleChange = (v: number, type: 'min' | 'max') => {
    const tempRange = [...(value || [0, 0])];
    if (type === 'min') {
      tempRange[0] = v;
    } else {
      tempRange[1] = v;
    }
    console.log('tempRange', tempRange);
    onChange(tempRange);
  };

  useEffect(() => {
    if (inputRef.current) {
      registerInput(inputRef);
    }
    return () => {
      unregisterInput(inputRef);
    };
  }, [registerInput, unregisterInput]);

  return (
    <View>
      {label && (
        <View
          style={{
            marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp1,
            marginLeft: APP_STYLE_VALUES.SPACE_SIZES.sp1,
          }}
        >
          <TextStyled textAlignment="left" fontSize="md" fontWeight="regular">
            {label}
          </TextStyled>
        </View>
      )}

      <View
        style={[
          commonStyles.flexStyles.rowStart,
          {
            flex: 1,
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            alignItems: 'center',
          },
        ]}
      >
        <InputStyled
          name={name + 'Min'}
          placeholder="Min"
          type="number"
          defaultValue={value ? value[0].toString() : ''}
          onChangeText={(val) => handleChange(+val, 'min')}
        />
        <InputStyled
          name={name + 'Max'}
          placeholder="Max"
          type="number"
          defaultValue={value ? value[1].toString() : ''}
          onChangeText={(val) => handleChange(+val, 'max')}
        />
      </View>
    </View>
  );
};

export default InputMinMaxStyled;
