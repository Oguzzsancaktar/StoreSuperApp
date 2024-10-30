import { Href, useRouter } from 'expo-router';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { TextStyled } from '../typography';
import { useAppTheme } from '@/contexts/ThemeContext';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import useCommonStyles from '@/hooks/useCommonStyles';
import APP_ROUTES from '@/constants/APP_ROUTES';
import { COMMON_COLOURS } from '@/constants/APP_THEMES';

interface IProps {
  icon: any;
  text: string;
  isActive: boolean;
  to: Href<string | object>;
}
const ButtonActiveTab: React.FC<IProps> = ({ icon, text, isActive, to }) => {
  const { theme, setUseSafeArea } = useAppTheme();
  const commonStyles = useCommonStyles();
  const { height, width } = useWindowDimensions();

  const router = useRouter();

  const handlePress = () => {
    // if (to === '/profile') {
    //   setUseSafeArea(false);
    // } else {
    //   setUseSafeArea(true);
    // }
    router.push(to);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        commonStyles.flexStyles.colCenter,
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            to === '/addPost' ? theme.primary : COMMON_COLOURS.transparent,
          width:
            to === '/addPost'
              ? APP_STYLE_VALUES.WH_SIZES.lg
              : (width -
                  APP_STYLE_VALUES.SPACE_SIZES.sp4 * 2 -
                  APP_STYLE_VALUES.SPACE_SIZES.sp2 * 2) /
                5,
          marginTop: to === '/addPost' ? -APP_STYLE_VALUES.SPACE_SIZES.sp2 : 0,
          height: to === '/addPost' ? APP_STYLE_VALUES.WH_SIZES.lg : '100%',
          padding: APP_STYLE_VALUES.SPACE_SIZES.sp1,
          borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.full,
        },
      ]}
    >
      {icon({
        color:
          isActive && to !== '/addPost' ? theme.primary : theme.grayScale900,
      })}
      {text !== '' && (
        <TextStyled
          fontSize="sm"
          fontWeight="medium"
          customColor={isActive ? 'white' : 'grayScale900'}
        >
          {text}
        </TextStyled>
      )}
    </TouchableOpacity>
  );
};

export default ButtonActiveTab;
