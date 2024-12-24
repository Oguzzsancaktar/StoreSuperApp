import ScreenWrapperContainer from "@/components/containers/ScreenWrapperContainer";
import ScreenProfile from "@/components/screens/ScreenProfile";

const ProfileScreen = () => {
  return (
    <ScreenWrapperContainer isTopEdgeInActive>
      <ScreenProfile />
    </ScreenWrapperContainer>
  );
};

export default ProfileScreen;
