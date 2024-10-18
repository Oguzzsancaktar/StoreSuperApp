import { useState } from 'react';
import { IIconOptions, IInputProps } from '@/interfaces/app';
import { View, TextInput } from 'react-native';
import useThemedStyles from '@/hooks/useThemedStyles';
import { useAppTheme } from '@/contexts/ThemeContext';
import { TextStyled } from '../typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';

interface IProps extends React.ComponentProps<typeof TextInput>, IInputProps {
  leftIcon?: IIconOptions;
}

const InputStyled: React.FC<IProps> = ({
  leftIcon,
  placeholder,
  label,
  type,
  ...props
}) => {
  const { theme } = useAppTheme();
  const themedStyles = useThemedStyles();
  const [isFocused, setIsFocused] = useState<boolean>(false);

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
        style={[
          themedStyles.inputStyles.default,
          isFocused && themedStyles.inputStyles.inputFocused,
        ]}
        placeholderTextColor={theme.grayScale500}
        placeholder={placeholder}
        onFocus={() => setIsFocused(() => true)}
        onBlur={() => setIsFocused(() => false)}
      />
    </View>
  );
};

export default InputStyled;
