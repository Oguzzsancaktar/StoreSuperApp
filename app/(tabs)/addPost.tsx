import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import Unauthorized from '@/components/feedback/Unauthorized';
import WizardListingCreate from '@/components/wizard/listing-create/WizardListingCreate';
import { useSession } from '@/contexts/AuthContext';

const AddPostScreen = () => {
  const { session } = useSession();

  if (!session) {
    return <Unauthorized showGoBack={false} isTabBarActive={true} />;
  }

  return (
    <ScreenWrapperContainer>
      <WizardListingCreate />
    </ScreenWrapperContainer>
  );
};

export default AddPostScreen;
