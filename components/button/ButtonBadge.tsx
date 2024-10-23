import { View } from 'react-native';
import ButtonStyled from './ButtonStyled';

interface IProps {
  text: string;
}
const ButtonBadge: React.FC<IProps> = ({ text }) => {
  return (
    <View>
      <ButtonStyled text={text} variant="badgeOutlined" />
    </View>
  );
};

export default ButtonBadge;
