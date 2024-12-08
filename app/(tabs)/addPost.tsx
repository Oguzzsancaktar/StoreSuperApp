import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import Unauthorized from '@/components/feedback/Unauthorized';
import WizardListingCreate from '@/components/wizard/listing-create/WizardListingCreate';
import APP_ROUTES from '@/constants/APP_ROUTES';
import { useSession } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';

const AddPostScreen = () => {
  const { session } = useSession();

  if (!session) {
    return <Unauthorized />;
  }

  return (
    <ScreenWrapperContainer>
      <WizardListingCreate />
    </ScreenWrapperContainer>
  );
};

export default AddPostScreen;
