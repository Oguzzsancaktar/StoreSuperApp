import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { TextStyled } from '@/components/typography';
import { View, Text } from 'react-native';

const MessagesScreen = () => {
  return (
    <ScreenWrapperContainer>
      <TextStyled fontSize="h5" fontWeight="bold">
        Messages
      </TextStyled>
    </ScreenWrapperContainer>
  );
};

export default MessagesScreen;
