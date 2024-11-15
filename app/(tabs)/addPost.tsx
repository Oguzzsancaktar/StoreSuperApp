import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import WizardListingCreate from '@/components/wizard/listing-create/WizardListingCreate';
import APP_ROUTES from '@/constants/APP_ROUTES';
import { useSession } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';

const AddPostScreen = () => {
  const { session } = useSession();

  if (!session) {
    return <Redirect href={APP_ROUTES.PUBLIC.WELCOME} />;
  }

  return (
    <ScreenWrapperContainer>
      <WizardListingCreate />
    </ScreenWrapperContainer>
  );
};

export default AddPostScreen;
