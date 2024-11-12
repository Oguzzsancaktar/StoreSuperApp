import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import ISelectOption from '@/interfaces/theme/ISelectOption';
import useThemedStyles from '@/hooks/useThemedStyles';
import { useAppTheme } from '@/contexts/ThemeContext';
import APP_TYPOGRAPHY from '@/constants/APP_TYPOGRAPHY';
import { View } from 'react-native';
import { TextStyled } from '../typography';

interface IProps {
  label?: string;
  options: ISelectOption[];
  value?: ISelectOption;
  variant: 'transparent' | 'solid';
  handleSelect(selected: ISelectOption): void;
}

const InputSelectStyled: React.FC<IProps> = ({
  label,
  options,
  value,
  variant,
  handleSelect,
}) => {
  const themedStyles = useThemedStyles();
  const { theme } = useAppTheme();

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

      <Dropdown
        autoScroll={false}
        data={options}
        labelField="label"
        valueField="value"
        value={value}
        onChange={handleSelect}
        style={[
          variant === 'transparent'
            ? themedStyles.buttonStyles.badgeOutlined
            : themedStyles.buttonStyles.buttonPrimarySolid,
          themedStyles.inputStyles.default,
          {
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
        iconColor={theme.white}
        activeColor={theme.grayScale300}
        itemContainerStyle={{}}
        itemTextStyle={{ color: theme.grayScale900 }}
        fontFamily="BRShapeMedium"
      />
    </View>
  );
};

export default InputSelectStyled;
