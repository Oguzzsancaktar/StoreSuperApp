import ScreenWrapperContainer from "@/components/containers/ScreenWrapperContainer";
import Unauthorized from "@/components/feedback/Unauthorized";
import WizardListingCreate from "@/components/wizard/listing-create/WizardListingCreate";
import { useAppAuthSession } from "@/contexts/AuthContext";

const AddPostScreen = () => {
  const { authToken } = useAppAuthSession();

  if (!authToken) {
    return <Unauthorized showGoBack={false} isTabBarActive={true} />;
  }

  return (
    <ScreenWrapperContainer>
      <WizardListingCreate />
    </ScreenWrapperContainer>
  );
};

export default AddPostScreen;
