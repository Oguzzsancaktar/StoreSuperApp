import { useState } from 'react';
import { IIconOptions, IInputProps } from '@/interfaces/app';
import { View, TextInput } from 'react-native';
import useThemedStyles from '@/hooks/useThemedStyles';
import { useAppTheme } from '@/contexts/ThemeContext';
import { TextStyled } from '../typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';

interface IProps
  extends React.ComponentProps<typeof TextInput>,
    Omit<IInputProps, 'required'> {
  leftIcon?: IIconOptions;
  handleFocus?: (val: boolean) => void;
  handleBlur?: (val: boolean) => void;
}

const InputStyled: React.FC<IProps> = ({
  leftIcon,
  placeholder,
  label,
  type,
  handleFocus,
  handleBlur,
  ...props
}) => {
  const { theme } = useAppTheme();
  const themedStyles = useThemedStyles();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleOnFocus = () => {
    handleFocus && handleFocus(true);
    setIsFocused(() => true);
  };

  const handleOnBlur = () => {
    handleBlur && handleBlur(false);

    setIsFocused(() => false);
  };

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
      <TextInput
        {...props}
        multiline={type === 'textarea'}
        style={[
          themedStyles.inputStyles.default,
          isFocused && themedStyles.inputStyles.inputFocused,
          type === 'textarea' && {
            height: APP_STYLE_VALUES.WH_SIZES.xl2,
          },
        ]}
        placeholderTextColor={theme.grayScale500}
        placeholder={placeholder}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        keyboardType={type === 'number' ? 'numeric' : 'default'}
      />
    </View>
  );
};

export default InputStyled;
