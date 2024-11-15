import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { TextStyled } from '@/components/typography';
import APP_ROUTES from '@/constants/APP_ROUTES';
import { useSession } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';

const MessagesScreen = () => {
  const { session } = useSession();

  if (!session) {
    return <Redirect href={APP_ROUTES.PUBLIC.WELCOME} />;
  }

  return (
    <ScreenWrapperContainer>
      <TextStyled fontSize="h5" fontWeight="bold">
        Messages
      </TextStyled>
    </ScreenWrapperContainer>
  );
};

export default MessagesScreen;
