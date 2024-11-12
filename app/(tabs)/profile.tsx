import { ButtonStyled } from '@/components/button';
import CardNewestPostings from '@/components/cards/CardNewestPostings';
import CardSellerProfileInfo from '@/components/cards/CardSellerProfileInfo';
import { InnerCommonContainer } from '@/components/containers';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import ImageCover from '@/components/images/ImageCover';
import ImageIconCircle from '@/components/images/ImageIconCircle';
import IconBookmark from '@/components/svg/icon/IconBookmark';
import IconHeart from '@/components/svg/icon/IconHeart';
import IconSendMessage from '@/components/svg/icon/IconSendMessage';
import IconSettingCog from '@/components/svg/icon/IconSettingCog';
import { TextStyled } from '@/components/typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import useAppImages from '@/hooks/useAppImages';
import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import { router, usePathname } from 'expo-router';
import { View, TouchableOpacity, ScrollView } from 'react-native';

const ProfileScreen = () => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const { theme } = useAppTheme();

  const handleSettingsPress = () => {
    router.navigate('/(drawer)/settings');
  };

  return (
    <ScreenWrapperContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            themedStyles.cardStyles.default,
            {
              padding: 0,
              paddingVertical: 0,
              borderWidth: 0,
              height: APP_STYLE_VALUES.WH_SIZES.xl4,
            },
          ]}
        >
          <View
            style={[
              commonStyles.absolutePositionStyles.absoluteFill,
              {
                flex: 1,
                height: '100%',
                width: '100%',
              },
            ]}
          >
            <ImageCover imageId="BANNER_PROFILE_DEFAULT" />
          </View>

          <InnerCommonContainer>
            <View
              style={[
                commonStyles.flexStyles.rowBetween,
                { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
              ]}
            >
              {/* @todo add it to button compoennt for icon */}
              <View style={{ width: APP_STYLE_VALUES.WH_SIZES.xl4 }}>
                <ButtonStyled variant="badgeOutlined">
                  <View
                    style={[
                      commonStyles.flexStyles.rowCenterWrap,
                      { width: '100%', gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
                    ]}
                  >
                    <View
                      style={[
                        commonStyles.flexStyles.rowStart,
                        { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
                      ]}
                    >
                      <IconHeart color={theme.white} />

                      <TextStyled
                        textAlignment="left"
                        fontSize="lg"
                        fontWeight="semibold"
                        customColor="grayScale900"
                      >
                        Favorites
                      </TextStyled>
                    </View>
                  </View>
                </ButtonStyled>
              </View>
              <View
                style={[
                  commonStyles.flexStyles.rowWrap,
                  { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
                ]}
              >
                <ImageIconCircle icon={<IconBookmark color={theme.white} />} />

                <TouchableOpacity onPress={handleSettingsPress}>
                  <ImageIconCircle
                    icon={<IconSettingCog color={theme.white} />}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </InnerCommonContainer>
        </View>
        <InnerCommonContainer>
          <View style={{ flex: 1, gap: APP_STYLE_VALUES.SPACE_SIZES.sp4 }}>
            <CardSellerProfileInfo />

            <View style={{ flex: 1, gap: APP_STYLE_VALUES.SPACE_SIZES.sp4 }}>
              <CardNewestPostings />
            </View>
          </View>
        </InnerCommonContainer>
      </ScrollView>
    </ScreenWrapperContainer>
  );
};

export default ProfileScreen;
