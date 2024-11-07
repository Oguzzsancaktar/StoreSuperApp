import CardListingCategories from '@/components/cards/listing/CardListingCategories';
import CardListingItems from '@/components/cards/listing/CardListingItems';
import { InnerCommonContainer } from '@/components/containers';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { TextStyled } from '@/components/typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import {
  ListingFilterProvider,
  useListingFilter,
} from '@/contexts/ListingFilterContext';
import IListingCategory from '@/interfaces/listing/IListingCategory';
import { useMemo, useState } from 'react';
import { View } from 'react-native';

const PostScreenActiveComponent = () => {
  const { setSelectedCategory } = useListingFilter();

  const { selectedCategory } = useListingFilter();

  const activeTab = useMemo(() => {
    let tab = (
      <CardListingCategories
        selectedCategory={selectedCategory || ''}
        handleSelectCategory={(categoryId) => setSelectedCategory(categoryId)}
      />
    );
    if (selectedCategory) {
      tab = <CardListingItems />;
    } else {
      tab = (
        <CardListingCategories
          selectedCategory={selectedCategory || ''}
          handleSelectCategory={(categoryId) => setSelectedCategory(categoryId)}
        />
      );
    }

    return tab;
  }, [selectedCategory]);

  return (
    <InnerCommonContainer>
      <View style={{ flex: 1, marginTop: APP_STYLE_VALUES.SPACE_SIZES.sp4 }}>
        {activeTab}
      </View>
    </InnerCommonContainer>
  );
};

const PostListScreen = () => {
  return (
    <ScreenWrapperContainer>
      <PostScreenActiveComponent />
    </ScreenWrapperContainer>
  );
};

export default PostListScreen;
