import { View } from 'react-native';
import useCommonStyles from '@/hooks/useCommonStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';

interface IProps {
  children: React.ReactNode;
}

const InnerCommonContainer: React.FC<IProps> = ({ children }) => {
  const commonStyles = useCommonStyles();

  return (
    <View
      style={[
        commonStyles.flexStyles.selfCenter,
        commonStyles.flexStyles.colBetween,
        {
          paddingHorizontal: APP_STYLE_VALUES.SPACE_SIZES.sp4,
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%',
        },
      ]}
    >
      {children}
    </View>
  );
};

export default InnerCommonContainer;
