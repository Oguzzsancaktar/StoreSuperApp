import React, { useState } from 'react';
import { IIconOptions } from '@/interfaces/app';
import { View, TextInput } from 'react-native';
import useThemedStyles from '@/hooks/useThemedStyles';

interface IProps extends React.ComponentProps<typeof TextInput> {
  leftIcon?: IIconOptions;
  placeholder: string;
  type: 'text' | 'password' | 'number';
}
const InputStyled: React.FC<IProps> = ({
  leftIcon,
  placeholder,
  type,
  ...props
}) => {
  const themedStyles = useThemedStyles();

  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <View style={[themedStyles.borderStyles.default]}>
      <TextInput
        {...props}
        placeholder={placeholder}
        onFocus={() => setIsFocused(() => true)}
        onBlur={() => setIsFocused(() => false)}
      />
    </View>
  );
};

export default InputStyled;
