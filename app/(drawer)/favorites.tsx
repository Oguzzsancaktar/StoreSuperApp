import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { InnerCommonContainer } from '@/components/containers';
import useCommonStyles from '@/hooks/useCommonStyles';
import { TextStyled } from '@/components/typography';
import { TouchableOpacity, View } from 'react-native';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import IconSettingCog from '@/components/svg/icon/IconSettingCog';
import ImageIconCircle from '@/components/images/ImageIconCircle';
import CardLinkItem from '@/components/cards/CardLinkItem';
import { map } from 'lodash';
import { IIconNames } from '@/interfaces/app';
import ButtonLogout from '@/components/button/ButtonLogout';
import { useGetListingFavoritesQuery } from '@/services/listingServices';
import CardPostItem from '@/components/cards/CardPostItem';
import FlatListStyled from '@/components/override/FlatListStyled';

export interface ISettingItemProps {
  icon: IIconNames;
  text: string;
  right: 'chevron' | 'switch';
  onPress: () => void;
}

const FavoritesScreen = () => {
  const { theme, toggleTheme } = useAppTheme();
  const commonStyles = useCommonStyles();

  const { data: favoriteListingsData } = useGetListingFavoritesQuery();

  console.log('favoriteListingsData', favoriteListingsData);

  if (!favoriteListingsData) {
    // @todo handle empty data and loading
    return <ScreenWrapperContainer />;
  }

  return (
    <ScreenWrapperContainer
      headerTitle="Favorites"
      showGoBack={true}
      showBorderUnderline={true}
      rightElement={
        <TextStyled
          fontSize="lg"
          fontWeight="medium"
          customColor="grayScale700"
        >
          {favoriteListingsData.length}
        </TextStyled>
      }
    >
      <InnerCommonContainer>
        <FlatListStyled
          onStartShouldSetResponder={() => true}
          data={favoriteListingsData}
          renderItem={({ item }) => <CardPostItem post={item.listing} />}
        />
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default FavoritesScreen;
