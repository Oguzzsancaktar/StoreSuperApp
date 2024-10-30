import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { TextStyled } from '@/components/typography';
import { View, Text } from 'react-native';

const PostListScreen = () => {
  return (
    <ScreenWrapperContainer>
      <TextStyled fontSize="h5" fontWeight="bold">
        Post List
      </TextStyled>
    </ScreenWrapperContainer>
  );
};

export default PostListScreen;
