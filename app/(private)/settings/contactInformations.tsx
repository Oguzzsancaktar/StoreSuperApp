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

export interface IAddressItemProps {
  icon: IIconNames;
  text: string;
  right: 'chevron' | 'switch';
  onPress: () => void;
}

const UpdateContactInformationScreen = () => {
  const { theme, toggleTheme } = useAppTheme();
  const commonStyles = useCommonStyles();

  const Address_ITEMS: IAddressItemProps[] = useMemo(
    () => [
      {
        icon: 'IconUser',
        text: 'Personal Information',
        right: 'chevron',
        onPress: () => {
          router.push(APP_ROUTES.PUBLIC.ADDRESS_PERSONAL_INFORMATIONS);
        },
      },
      {
        icon: 'IconPhone',
        text: 'Contact Information',
        right: 'chevron',
        onPress: () => {
          router.push(APP_ROUTES.PUBLIC.ADDRESS_CONTACT_INFORMATIONS);
        },
      },
      {
        icon: 'IconLocation',
        text: 'Address Information',
        right: 'chevron',
        onPress: () => {
          router.push(APP_ROUTES.PUBLIC.ADDRESS_ADDRESS_INFORMATIONS);
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
              Contact Informations
            </TextStyled>
          </View>

          <View
            style={[
              commonStyles.flexStyles.colStart,
              { width: '100%', gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
            ]}
          ></View>
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default UpdateContactInformationScreen;
