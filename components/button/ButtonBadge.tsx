import { Pressable, View } from 'react-native';
import ButtonStyled from './ButtonStyled';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';

interface IProps {
  text: string;
  onClick?: () => void;
}
const ButtonBadge: React.FC<IProps> = ({ text, onClick }) => {
  return (
    <View
      style={{
        width: 'auto',
        minWidth: APP_STYLE_VALUES.WH_SIZES.xl4,
        flex: 1,
      }}
    >
      <ButtonStyled onPress={onClick} text={text} variant="badgeOutlined" />
    </View>
  );
};

export default ButtonBadge;
