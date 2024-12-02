import { View } from 'react-native';
import useThemedStyles from '@/hooks/useThemedStyles';
import { ButtonGoBack } from '../button';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import useCommonStyles from '@/hooks/useCommonStyles';

interface IProps {
  children: React.ReactNode;
  showGoBack?: boolean;
}
const ScreenWrapperContainer: React.FC<IProps> = ({
  children,
  showGoBack = false,
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
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

export default ScreenWrapperContainer;
