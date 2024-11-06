import { InnerCommonContainer } from '@/components/containers';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import WizardListingCreate from '@/components/wizard/listing-create/WizardListingCreate';

const AddPostScreen = () => {
  return (
    <ScreenWrapperContainer>
      <InnerCommonContainer>
        <WizardListingCreate />
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default AddPostScreen;
