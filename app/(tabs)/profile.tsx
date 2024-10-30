import { ButtonStyled } from '@/components/button';
import CardNewestPostings from '@/components/cards/CardNewestPostings';
import CardSellerProfileInfo from '@/components/cards/CardSellerProfileInfo';
import { InnerCommonContainer } from '@/components/containers';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import ImageIconCircle from '@/components/images/ImageIconCircle';
import IconBookmark from '@/components/svg/icon/IconBookmark';
import IconSettingCog from '@/components/svg/icon/IconSettingCog';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import { router, usePathname } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();

  const handleSettingsPress = () => {
    router.push('/(drawer)/settings');
  };

  return (
    <ScreenWrapperContainer>
      <View
        style={[
          themedStyles.cardStyles.default,
          {
            borderWidth: 0,
            height: APP_STYLE_VALUES.WH_SIZES.xl3,
          },
        ]}
      >
        <View
          style={[
            commonStyles.flexStyles.rowBetween,
            { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
          ]}
        >
          <View style={{ width: APP_STYLE_VALUES.WH_SIZES.xl3 }}>
            <ButtonStyled text="Profile Informations" variant="badgeOutlined" />
          </View>
          <View
            style={[
              commonStyles.flexStyles.rowWrap,
              { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
            ]}
          >
            <ImageIconCircle icon={<IconBookmark />} />
            <TouchableOpacity onPress={handleSettingsPress}>
              <ImageIconCircle icon={<IconSettingCog />} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <InnerCommonContainer>
        <View style={{ gap: APP_STYLE_VALUES.SPACE_SIZES.sp4 }}>
          <CardSellerProfileInfo />
          <CardNewestPostings />
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default ProfileScreen;
