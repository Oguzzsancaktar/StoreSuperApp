import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { InnerCommonContainer } from '@/components/containers';
import { TextStyled } from '@/components/typography';
import { IIconNames } from '@/interfaces/app';
import { useGetListingFavoritesQuery } from '@/services/listingServices';
import CardPostItem from '@/components/cards/CardPostItem';
import FlatListStyled from '@/components/override/FlatListStyled';
import Preloader from '@/components/feedback/Preloader';

export interface ISettingItemProps {
  icon: IIconNames;
  text: string;
  right: 'chevron' | 'switch';
  onPress: () => void;
}

const FavoritesScreen = () => {
  const { data: favoriteListingsData, isLoading: isLoadingFavoriteListings } =
    useGetListingFavoritesQuery();

  if (isLoadingFavoriteListings) {
    return <Preloader />;
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
          {favoriteListingsData?.length || 0}
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
