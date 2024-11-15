import { useMemo, useState } from 'react';
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

interface IProps
  extends React.ComponentProps<typeof TextInput>,
    Omit<IInputProps, 'required'> {
  handleFocus?: (val: boolean) => void;
  handleBlur?: (val: boolean) => void;
}

const InputStyled: React.FC<IProps> = ({
  placeholder,
  label,
  type,
  name,
  handleFocus,
  handleBlur,
  ...props
}) => {
  const { theme } = useAppTheme();
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hideInputValue, setHideInputValue] = useState<boolean>(
    name?.toLowerCase()?.includes('password')
  );

  const handleOnFocus = () => {
    handleFocus && handleFocus(true);
    setIsFocused(() => true);
  };

  const handleOnBlur = () => {
    handleBlur && handleBlur(false);
    setIsFocused(() => false);
  };

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
          themedStyles.inputStyles.default,
          isFocused && themedStyles.inputStyles.inputFocused,
          { padding: 0, margin: 0, alignItems: 'center' },
          type === 'textarea' && {
            height: APP_STYLE_VALUES.WH_SIZES.xl2,
          },
        ]}
      >
        {leftIconName && (
          <View
            style={[
              commonStyles.flexStyles.flexCenter,
              { width: APP_STYLE_VALUES.WH_SIZES.md },
            ]}
          >
            {getIconWithProps(leftIconName, {
              color: isFocused ? theme.primary : theme.grayScale600,
            })}
          </View>
        )}
        <TextInput
          {...props}
          style={[
            themedStyles.inputStyles.default,
            {
              borderWidth: 0,
              padding: !leftIconName
                ? themedStyles.inputStyles.default.padding
                : 0,
              flex: 1,
            },
            type === 'textarea' && {
              padding: themedStyles.inputStyles.default.padding,
              height: APP_STYLE_VALUES.WH_SIZES.xl2,
            },
          ]}
          autoCorrect={false}
          autoCapitalize={'none'}
          secureTextEntry={hideInputValue}
          multiline={type === 'textarea'}
          placeholderTextColor={theme.grayScale500}
          placeholder={placeholder}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          keyboardType={type === 'number' ? 'numeric' : 'default'}
        />

        {name?.toLowerCase()?.includes('password') && (
          <Pressable
            onPress={() => setHideInputValue((prev) => !prev)}
            style={[
              commonStyles.flexStyles.flexCenter,
              { width: APP_STYLE_VALUES.WH_SIZES.md },
            ]}
          >
            {hideInputValue ? (
              <IconEyeHide color={theme.grayScale600} />
            ) : (
              <IconEyeShow color={theme.grayScale600} />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default InputStyled;
