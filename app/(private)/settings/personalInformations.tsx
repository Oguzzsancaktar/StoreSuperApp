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
import FormPersonalInformation from '@/components/form/FormPersonalInformation';

export interface ISettingItemProps {
  icon: IIconNames;
  text: string;
  right: 'chevron' | 'switch';
  onPress: () => void;
}

const PersonalInformationScreen = () => {
  const { theme } = useAppTheme();
  const commonStyles = useCommonStyles();

  return (
    <ScreenWrapperContainer showGoBack={true}>
      <InnerCommonContainer>
        <View
          style={[
            commonStyles.flexStyles.colStart,
            {
              height: '100%',
              width: '100%',
              gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            },
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
              Personal Informations
            </TextStyled>
          </View>

          <View
            style={[
              commonStyles.flexStyles.colStart,
              {
                flex: 1,
                width: '100%',
                gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
              },
            ]}
          >
            <FormPersonalInformation />
          </View>
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default PersonalInformationScreen;
