import { useEffect, useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useInputFocus } from "@/contexts/InputFocusContext";
import useAppStyles from "@/hooks/useAppStyles";
import { IInputProps } from "@/interfaces/app";

import { getIconWithProps } from "../svg/icon";
import { TextStyled } from "../typography";

interface IProps extends Omit<IInputProps, "required"> {
  handleFocus?: (val: boolean) => void;
  handleBlur?: (val: boolean) => void;
  onChange: (event: DateTimePickerEvent, date?: Date | undefined) => void;
  value: Date;
}

const InputDatePickerStyled: React.FC<IProps> = ({
  placeholder,
  label,
  type,
  name,
  value,
  handleFocus,
  handleBlur,
  onChange,
  ...props
}) => {
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme, isDark },
  } = useAppStyles();

  const inputRef = useRef<TextInput>(null);
  const { registerInput, unregisterInput } = useInputFocus();

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleOnFocus = () => {
    setIsFocused(() => true);
  };

  const handleOnBlur = () => {
    setIsFocused(() => false);
  };

  const toogleFocus = () => {
    if (isFocused) {
      handleOnBlur();
    } else {
      handleOnFocus();
    }
  };

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
    <Pressable ref={inputRef} onPress={toogleFocus} style={{ flex: 1 }}>
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
          { padding: 0, margin: 0, alignItems: "center" },
          type === "textarea" && {
            height: APP_STYLE_VALUES.WH_SIZES.xl4,
          },
        ]}
      >
        <View
          style={[
            commonStyles.flexStyles.flexCenter,
            { width: APP_STYLE_VALUES.WH_SIZES.md },
          ]}
        >
          {getIconWithProps("IconCalendar", {
            color: isFocused ? theme.primary : theme.grayScale600,
          })}
        </View>

        <DateTimePicker
          {...props}
          testID={name}
          value={value || new Date()}
          mode="date"
          display="default"
          themeVariant={isDark ? "dark" : "light"}
          onChange={onChange}
          textColor={theme.grayScale900}
          accentColor={theme.primary}
          style={[
            commonStyles.flexStyles.rowCenter,
            {
              paddingRight: APP_STYLE_VALUES.SPACE_SIZES.sp4,
              borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.lg,
              flex: 1,
              zIndex: 9,
            },
          ]}
          maximumDate={new Date()}
        />
      </View>
    </Pressable>
  );
};

export default InputDatePickerStyled;
