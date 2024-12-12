import { StyleSheet, View } from 'react-native';
import ButtonStyled from './ButtonStyled';
import IconLogout from '../svg/icon/IconLogout';
import { TextStyled } from '../typography';
import useCommonStyles from '@/hooks/useCommonStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import { useSession } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import APP_ROUTES from '@/constants/APP_ROUTES';

interface IProps {}
const ButtonLogout: React.FC<IProps> = () => {
  const commonStyles = useCommonStyles();
  const { theme } = useAppTheme();
  const { session, signOut } = useSession();

  const handlePress = () => {
    if (!session) {
      router.replace(APP_ROUTES.PUBLIC.LOGIN);
    } else {
      signOut();
      router.push(APP_ROUTES.PUBLIC.WELCOME);
    }
  };
  return (
    <ButtonStyled
      onPress={handlePress}
      gradientBg={true}
      variant="primaryOutlined"
    >
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
          {session && <IconLogout color={theme.grayScale900} />}
          <View>
            <TextStyled
              textAlignment="left"
              fontSize="lg"
              fontWeight="semibold"
              customColor="grayScale900"
            >
              {session ? 'Logout' : 'Login'}
            </TextStyled>
          </View>
        </View>
      </View>
    </ButtonStyled>
  );
};

export default ButtonLogout;
