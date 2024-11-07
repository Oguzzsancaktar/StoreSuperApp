import { View } from 'react-native';
import useCommonStyles from '@/hooks/useCommonStyles';

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
        commonStyles.spacingStyles.p4,
        {
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
