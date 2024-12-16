import { ButtonStyled } from '@/components/button';
import CardSellerProfileInfo from '@/components/cards/CardSellerProfileInfo';
import { InnerCommonContainer } from '@/components/containers';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import ImageStyled from '@/components/images/ImageStyled';
import ImageIconCircle from '@/components/images/ImageIconCircle';
import IconBookmark from '@/components/svg/icon/IconBookmark';
import IconHeart from '@/components/svg/icon/IconHeart';
import IconSettingCog from '@/components/svg/icon/IconSettingCog';
import { TextStyled } from '@/components/typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import { useGetCurrentUserListingsQuery } from '@/services/accountServices';
import { router } from 'expo-router';
import { View, TouchableOpacity, Animated } from 'react-native';
import CardPostItem from '@/components/cards/CardPostItem';
import FlatListStyled from '@/components/override/FlatListStyled';
import APP_ROUTES from '@/constants/APP_ROUTES';
import { useSession } from '@/contexts/AuthContext';
import Unauthorized from '@/components/feedback/Unauthorized';
import { useRef } from 'react';
import ScreenProfile from '@/components/screens/ScreenProfile';

const ProfileScreen = () => {
  const { session } = useSession();

  return (
    <ScreenWrapperContainer>
      <ScreenProfile />
    </ScreenWrapperContainer>
  );
};

export default ProfileScreen;
