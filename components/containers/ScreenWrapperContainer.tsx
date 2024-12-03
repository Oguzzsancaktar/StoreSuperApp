import { View } from 'react-native';
import useThemedStyles from '@/hooks/useThemedStyles';
import { ButtonGoBack } from '../button';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';

interface IProps {
  children: React.ReactNode;
  showGoBack?: boolean;
  isTabsActive?: boolean;
}
const ScreenWrapperContainer: React.FC<IProps> = ({
  children,
  showGoBack = false,
  isTabsActive = false,
}) => {
  const themedStyles = useThemedStyles();
  return (
    <View style={[themedStyles.containerStyles.screenWrapperContainer]}>
      {showGoBack && (
        <View
          style={[
            {
              paddingHorizontal: APP_STYLE_VALUES.SPACE_SIZES.sp4,
              height: APP_STYLE_VALUES.WH_SIZES.sm,
            },
          ]}
        >
          <ButtonGoBack />
        </View>
      )}
      <View
        style={[
          {
            ...themedStyles.containerStyles.screenWrapperContainer,
            marginBottom: isTabsActive ? APP_STYLE_VALUES.SPACE_SIZES.sp13 : 0,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

export default ScreenWrapperContainer;
