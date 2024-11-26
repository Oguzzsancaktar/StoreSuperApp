import { useEffect, useMemo, useRef, useState } from 'react';
import { IIconNames, IInputProps } from '@/interfaces/app';
import { View, TextInput, Pressable } from 'react-native';
import useThemedStyles from '@/hooks/useThemedStyles';
import { useAppTheme } from '@/contexts/ThemeContext';
import { TextStyled } from '../typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import IconBell from '../svg/icon/IconBell';
import useCommonStyles from '@/hooks/useCommonStyles';
import { getIconWithProps } from '../svg/icon';
import IconEyeHide from '../svg/icon/IconEyeHide';
import IconEyeShow from '../svg/icon/IconEyeShow';
import { useInputFocus } from '@/contexts/InputFocusContext';
import InputStyled from './InputStyled';

interface IProps
  extends React.ComponentProps<typeof TextInput>,
    Omit<IInputProps, 'required' | 'type'> {
  handleFocus?: (val: boolean) => void;
  handleBlur?: (val: boolean) => void;
}

const InputMinMaxStyled: React.FC<IProps> = ({
  placeholder,
  label,
  name,
  ...props
}) => {
  const inputRef = useRef<TextInput>(null);
  const { registerInput, unregisterInput } = useInputFocus();

  const { theme } = useAppTheme();
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();

  const leftIconName = useMemo(() => {
    let iconName: IIconNames | null = null;

    switch (name) {
      case 'email':
        iconName = 'IconEmail';
        break;
      case 'password':
        iconName = 'IconLock';
        break;
      case 'confirmPassword':
        iconName = 'IconLock';
        break;
    }

    return iconName;
  }, [name]);

  useEffect(() => {
    // Input'u context'e kaydet
    if (inputRef.current) {
      registerInput(inputRef);
    }
    return () => {
      // Input'u context'ten çıkar
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
        <InputStyled name={name + 'Min'} placeholder="Min" type="number" />
        <InputStyled name={name + 'Max'} placeholder="Max" type="number" />
      </View>
    </View>
  );
};

export default InputMinMaxStyled;
