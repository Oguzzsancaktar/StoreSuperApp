import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import APP_TYPOGRAPHY from "@/constants/APP_TYPOGRAPHY";
import useAppStyles from "@/hooks/useAppStyles";
import { IButtonStylesheet } from "@/interfaces/theme";
import ISelectOption from "@/interfaces/theme/ISelectOption";

import ImageIconCircle from "../images/ImageIconCircle";
import IconClose from "../svg/icon/IconClose";
import { TextStyled } from "../typography";

interface IProps {
  label?: string;
  options: ISelectOption[];
  value?: ISelectOption;
  variant: keyof IButtonStylesheet;
  showReset?: boolean;
  placeholder?: string;
  searchable?: boolean;
  handleSelect(selected: ISelectOption | null): void;
  renderRightIcon?: DropdownProps<ISelectOption>["renderRightIcon"];
  containerStyle?: DropdownProps<ISelectOption>["containerStyle"];
}

const InputSelectStyled: React.FC<IProps> = ({
  label,
  options,
  value,
  variant,
  showReset,
  searchable = false,
  handleSelect,
  renderRightIcon,
  placeholder,
  containerStyle,
}) => {
  const { t } = useTranslation();
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme },
  } = useAppStyles();

  const handleResetClick = () => {
    handleSelect(null);
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
            {t(label)}
          </TextStyled>
        </View>
      )}

      <View
        style={[
          commonStyles.flexStyles.rowStart,
          { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
        ]}
      >
        <Dropdown
          renderRightIcon={renderRightIcon}
          search={searchable}
          autoScroll={false}
          data={options}
          labelField="label"
          valueField="value"
          value={value}
          placeholder={placeholder && t(placeholder)}
          onChange={handleSelect}
          style={[
            themedStyles.inputStyles.default,
            themedStyles.buttonStyles[variant as keyof IButtonStylesheet],

            {
              flex: 1,
              width: "100%",
              paddingHorizontal: APP_STYLE_VALUES.SPACE_SIZES.sp3,
            },
          ]}
          containerStyle={[
            {
              overflow: "hidden",
              borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.lg,
              padding: 0,
              paddingVertical: 0,
              backgroundColor: theme.grayScale100,
            },
            containerStyle,
          ]}
          placeholderStyle={{
            fontSize: APP_TYPOGRAPHY.fontSizes.h6,
            color: theme.grayScale500,
          }}
          selectedTextStyle={{
            fontSize: APP_TYPOGRAPHY.fontSizes.h6,
            color: theme.grayScale900,
          }}
          inputSearchStyle={[
            themedStyles.inputStyles.default,
            {
              margin: 0,
              borderWidth: 0,
            },
          ]}
          iconColor={theme.grayScale900}
          activeColor={theme.grayScale300}
          itemContainerStyle={{}}
          itemTextStyle={{ color: theme.grayScale900 }}
          fontFamily="BRShapeMedium"
        />
        {/* @todo create some logic for selecting button types I dont want to enter all props  */}
        {showReset && (
          <ImageIconCircle
            onPress={handleResetClick}
            gradientBg={true}
            bgColor="transparent"
            borderColor="error"
            size={APP_STYLE_VALUES.WH_SIZES.lg}
            icon={<IconClose color={theme.primary} />}
            radius={APP_STYLE_VALUES.RADIUS_SIZES.lg}
          />
        )}
      </View>
    </View>
  );
};

export default InputSelectStyled;
