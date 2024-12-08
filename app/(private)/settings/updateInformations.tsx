import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { InnerCommonContainer } from '@/components/containers';
import useCommonStyles from '@/hooks/useCommonStyles';
import { TextStyled } from '@/components/typography';
import { View } from 'react-native';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import IconSettingCog from '@/components/svg/icon/IconSettingCog';
import ImageIconCircle from '@/components/images/ImageIconCircle';
import CardLinkItem from '@/components/cards/CardLinkItem';
import { map } from 'lodash';
import { IIconNames } from '@/interfaces/app';
import { useMemo } from 'react';
import { router } from 'expo-router';
import APP_ROUTES from '@/constants/APP_ROUTES';

export interface ISettingItemProps {
  icon: IIconNames;
  text: string;
  right: 'chevron' | 'switch';
  onPress: () => void;
}

const UpdateInformationScreen = () => {
  const { theme, toggleTheme } = useAppTheme();
  const commonStyles = useCommonStyles();

  const SETTING_ITEMS: ISettingItemProps[] = useMemo(
    () => [
      {
        icon: 'IconUser',
        text: 'Personal Information',
        right: 'chevron',
        onPress: () => {
          router.push(APP_ROUTES.DRAWER.SETTINGS_PERSONAL_INFORMATIONS);
        },
      },
      {
        icon: 'IconPhone',
        text: 'Contact Information',
        right: 'chevron',
        onPress: () => {
          router.push(APP_ROUTES.DRAWER.SETTINGS_CONTACT_INFORMATIONS);
        },
      },
      {
        icon: 'IconLocation',
        text: 'Address Information',
        right: 'chevron',
        onPress: () => {
          router.push(APP_ROUTES.DRAWER.SETTINGS_ADDRESS_INFORMATIONS);
        },
      },
    ],
    [toggleTheme]
  );

  return (
    <ScreenWrapperContainer showGoBack={true}>
      <InnerCommonContainer>
        <View
          style={[
            commonStyles.flexStyles.colStart,
            { width: '100%', gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
          ]}
        >
          <View style={[commonStyles.flexStyles.colCenter, { width: '100%' }]}>
            <ImageIconCircle
              size={APP_STYLE_VALUES.WH_SIZES.xl}
              bgColor="primary"
              icon={
                <IconSettingCog
                  color={theme.white}
                  width={APP_STYLE_VALUES.WH_SIZES.sm}
                  height={APP_STYLE_VALUES.WH_SIZES.sm}
                />
              }
            />

            <TextStyled fontSize="h4" fontWeight="bold">
              Update Informations
            </TextStyled>
          </View>

          <View
            style={[
              commonStyles.flexStyles.colStart,
              { width: '100%', gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
            ]}
          >
            {map(SETTING_ITEMS, ({ text, icon, right, onPress }, index) => {
              return (
                <CardLinkItem
                  key={index}
                  icon={icon}
                  text={text}
                  right={right}
                  onPress={onPress}
                />
              );
            })}
          </View>
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default UpdateInformationScreen;
