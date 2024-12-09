import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import ISelectOption from '@/interfaces/theme/ISelectOption';
import useThemedStyles from '@/hooks/useThemedStyles';
import { useAppTheme } from '@/contexts/ThemeContext';
import APP_TYPOGRAPHY from '@/constants/APP_TYPOGRAPHY';
import { View } from 'react-native';
import { TextStyled } from '../typography';
import { IButtonStylesheet } from '@/interfaces/theme';
import ImageIconCircle from '../images/ImageIconCircle';
import IconClose from '../svg/icon/IconClose';
import useCommonStyles from '@/hooks/useCommonStyles';

interface IProps {
  label?: string;
  options: ISelectOption[];
  value?: ISelectOption;
  variant: keyof IButtonStylesheet;
  showReset?: boolean;

  searchable?: boolean;
  handleSelect(selected: ISelectOption | null): void;
}

const InputSelectStyled: React.FC<IProps> = ({
  label,
  options,
  value,
  variant,
  showReset,
  searchable = false,
  handleSelect,
}) => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const { theme } = useAppTheme();

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
            {label}
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
          search={searchable}
          autoScroll={false}
          data={options}
          labelField="label"
          valueField="value"
          value={value}
          onChange={handleSelect}
          style={[
            themedStyles.inputStyles.default,
            themedStyles.buttonStyles[variant as keyof IButtonStylesheet],

            {
              flex: 1,
              width: '100%',
              paddingHorizontal: APP_STYLE_VALUES.SPACE_SIZES.sp3,
            },
          ]}
          containerStyle={[
            {
              overflow: 'hidden',
              borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.lg,
              padding: 0,
              paddingVertical: 0,
              backgroundColor: theme.grayScale100,
            },
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
            gradientBg
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
