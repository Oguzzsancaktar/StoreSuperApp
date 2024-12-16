import { View, Text } from 'react-native';
import React from 'react';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import ScreenProfile from '@/components/screens/ScreenProfile';
import { useLocalSearchParams } from 'expo-router';

const UserProfilePage = () => {
  const { profileId } = useLocalSearchParams();

  return (
    <ScreenWrapperContainer isTabBarActive={false}>
      <ScreenProfile profileId={profileId as string} />
    </ScreenWrapperContainer>
  );
};

export default UserProfilePage;
