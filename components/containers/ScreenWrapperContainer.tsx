import { ScrollView, View } from 'react-native';
import useThemedStyles from '@/hooks/useThemedStyles';
import { ButtonGoBack } from '../button';

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
      {showGoBack && <ButtonGoBack variant="buttonPrimaryOutlined" />}
      <View style={[themedStyles.containerStyles.screenWrapperContainer]}>
        {children}
      </View>
    </View>
  );
};

export default ScreenWrapperContainer;
