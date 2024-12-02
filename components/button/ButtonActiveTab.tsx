import { Href, useRouter } from 'expo-router';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { TextStyled } from '../typography';
import { useAppTheme } from '@/contexts/ThemeContext';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import useCommonStyles from '@/hooks/useCommonStyles';
import APP_ROUTES from '@/constants/APP_ROUTES';
import { COMMON_COLOURS } from '@/constants/APP_THEMES';
import { useMemo } from 'react';

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

  const isPrimaryButton = useMemo(() => {
    return to === '/addPost';
  }, [to]);
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
          backgroundColor: isPrimaryButton
            ? theme.primary
            : COMMON_COLOURS.transparent,
          width: isPrimaryButton
            ? APP_STYLE_VALUES.WH_SIZES.lg
            : (width -
                APP_STYLE_VALUES.WH_SIZES.lg -
                APP_STYLE_VALUES.SPACE_SIZES.sp4 * 2 -
                APP_STYLE_VALUES.SPACE_SIZES.sp2 * 2) /
              4,
          marginTop: isPrimaryButton ? -APP_STYLE_VALUES.SPACE_SIZES.sp2 : 0,
          height: isPrimaryButton ? APP_STYLE_VALUES.WH_SIZES.lg : '100%',
          padding: APP_STYLE_VALUES.SPACE_SIZES.sp1,
          borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.full,
        },
      ]}
    >
      <View
        style={[
          commonStyles.flexStyles.flexCenter,
          {
            width: APP_STYLE_VALUES.WH_SIZES.xs,
            height: APP_STYLE_VALUES.WH_SIZES.xs,
          },
        ]}
      >
        {icon({
          color:
            isActive && !isPrimaryButton
              ? theme.primary
              : isPrimaryButton
              ? theme.white
              : theme.grayScale900,
        })}
      </View>

      {text !== '' && (
        <TextStyled
          fontSize="sm"
          fontWeight="medium"
          customColor={isActive ? 'primary' : 'grayScale900'}
        >
          {text}
        </TextStyled>
      )}
    </TouchableOpacity>
  );
};

export default ButtonActiveTab;
