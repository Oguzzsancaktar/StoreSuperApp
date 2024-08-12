import React from 'react';
import { View } from 'react-native';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import TextStyled from '@/components/typography/TextStyled';
import { InnerCommonContainer } from '@/components/containers';
import useCommonStyles from '@/hooks/useCommonStyles';

const SignupScreen = () => {
  const commonStyles = useCommonStyles();

  return (
    <ScreenWrapperContainer>
      <InnerCommonContainer>
        <View
          style={[
            commonStyles.maxWidthStyles.maxWidthXl,
            commonStyles.flexStyles.selfCenter,
            commonStyles.flexStyles.colBetween,
            { flex: 1, width: '100%' },
          ]}
        >
          <TextStyled
            fontSize="xl"
            fontWeight="regular"
            customColor="grayScale600"
          >
            Signup
          </TextStyled>
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default SignupScreen;
