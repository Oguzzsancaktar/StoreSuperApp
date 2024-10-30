import { StyleSheet, View } from 'react-native';
import ButtonStyled from './ButtonStyled';
import IconLogout from '../svg/icon/IconLogout';
import { TextStyled } from '../typography';
import useCommonStyles from '@/hooks/useCommonStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';

interface IProps {}
const ButtonLogout: React.FC<IProps> = () => {
  const commonStyles = useCommonStyles();
  const { theme } = useAppTheme();
  return (
    <ButtonStyled gradientBg={true} variant="buttonPrimaryOutlined">
      <View
        style={[
          commonStyles.flexStyles.rowCenterWrap,
          { width: '100%', gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
        ]}
      >
        <View
          style={[
            commonStyles.flexStyles.rowStart,
            { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
          ]}
        >
          <IconLogout color={theme.grayScale900} />
          <TextStyled
            textAlignment="left"
            fontSize="lg"
            fontWeight="semibold"
            customColor="grayScale900"
          >
            Logout
          </TextStyled>
        </View>
      </View>
    </ButtonStyled>
  );
};

export default ButtonLogout;
