import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { TextStyled } from '@/components/typography';
import { View, Text } from 'react-native';

const AddPostScreen = () => {
  return (
    <ScreenWrapperContainer>
      <TextStyled fontSize="h5" fontWeight="bold">
        Create Post
      </TextStyled>
    </ScreenWrapperContainer>
  );
};

export default AddPostScreen;
