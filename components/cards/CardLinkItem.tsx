import { ButtonStyled } from '../button';
import { TextStyled } from '../typography';
import { ISettingItemProps } from '@/app/(drawer)/settings';
import useCommonStyles from '@/hooks/useCommonStyles';
import { getIconWithProps } from '../svg/icon';
import { View } from 'react-native';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import InputSwitchStyled from '../input/InputSwitchStyled';
import APP_THEMES, { COMMON_COLOURS } from '@/constants/APP_THEMES';

interface IProps extends ISettingItemProps {}
const CardLinkItem: React.FC<IProps> = ({ text, icon, right, onPress }) => {
  const commonStyles = useCommonStyles();
  const { theme } = useAppTheme();

  return (
    <ButtonStyled onPress={onPress} variant="primaryOutlined">
      <View
        style={[
          commonStyles.flexStyles.rowBetween,
          {
            height: '100%',
            width: '100%',
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            alignItems: 'center',
          },
        ]}
      >
        <View
          style={[
            commonStyles.flexStyles.rowStart,
            {
              alignItems: 'center',
              gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            },
          ]}
        >
          {getIconWithProps(icon, { color: theme.primary })}
          <View style={{}}>
            <TextStyled
              textAlignment="left"
              fontSize="md"
              fontWeight="medium"
              customColor="grayScale900"
            >
              {text}
            </TextStyled>
          </View>
        </View>

        {right === 'chevron' ? (
          getIconWithProps('IconChevronRight', { color: theme.grayScale400 })
        ) : (
          <InputSwitchStyled
            onToggle={onPress}
            isOn={theme.grayScale100 === APP_THEMES.dark.grayScale100}
          />
        )}
      </View>
    </ButtonStyled>
  );
};

export default CardLinkItem;
