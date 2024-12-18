import { useMemo } from "react";
import { View } from "react-native";

import CardListingCategories from "@/components/cards/listing/CardListingCategories";
import CardListingItems from "@/components/cards/listing/CardListingItems";
import { InnerCommonContainer } from "@/components/containers";
import ScreenWrapperContainer from "@/components/containers/ScreenWrapperContainer";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useListingFilter } from "@/contexts/ListingFilterContext";

const PostScreenActiveComponent = () => {
  const { filterValues, setFilterValues } = useListingFilter();

  const activeTab = useMemo(() => {
    let tab = (
      <CardListingCategories
        selectedCategory={filterValues?.category || ""}
        handleSelectCategory={(categoryId) =>
          setFilterValues({ ...filterValues, category: categoryId })
        }
      />
    );
    if (filterValues?.category) {
      tab = <CardListingItems />;
    } else {
      tab = (
        <CardListingCategories
          selectedCategory={filterValues?.category || ""}
          handleSelectCategory={(categoryId) =>
            setFilterValues({ ...filterValues, category: categoryId })
          }
        />
      );
    }

    return tab;
  }, [filterValues?.category]);

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
