import { Href, useRouter } from 'expo-router';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { TextStyled } from '../typography';
import { useAppTheme } from '@/contexts/ThemeContext';

interface IProps {
  icon: any;
  text: string;
  isActive: boolean;
  to: Href<string | object>;
}
const ButtonActiveTab: React.FC<IProps> = ({ icon, text, isActive, to }) => {
  const { theme } = useAppTheme();
  const { height, width } = useWindowDimensions();

  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(to)}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isActive ? theme.primary : 'transparent',
        width: isActive ? 190 : (width - 190 - 40) / 3,
        height: 50,
        borderRadius: 30,
        paddingHorizontal: isActive ? 30 : 10,
      }}
    >
      {icon(isActive ? theme.white : theme.primary)}
      {isActive && (
        <TextStyled fontSize="md" fontWeight="semibold">
          text
        </TextStyled>
      )}
    </TouchableOpacity>
  );
};

export default ButtonActiveTab;
