import { useLocalSearchParams } from "expo-router";

import ScreenWrapperContainer from "@/components/containers/ScreenWrapperContainer";
import ScreenProfile from "@/components/screens/ScreenProfile";

const UserProfilePage = () => {
  const { profileId } = useLocalSearchParams();

  return (
    <ScreenWrapperContainer isTopEdgeInActive={true} isTabBarActive={false}>
      <ScreenProfile profileId={profileId as string} />
    </ScreenWrapperContainer>
  );
};

export default UserProfilePage;
