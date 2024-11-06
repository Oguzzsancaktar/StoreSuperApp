import { TouchableOpacity, View } from 'react-native';
import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import ISelectOption from '@/interfaces/theme/ISelectOption';
import { TextStyled } from '../../typography';
import IListingCategory from '@/interfaces/listing/IListingCategory';
import ImageCover from '../../images/ImageCover';
import { BlurView } from '@react-native-community/blur';
import { useListingFilter } from '@/contexts/ListingFilterContext';

interface IProps {
  category: IListingCategory;
}
const CardListingCategoryItem: React.FC<IProps> = ({ category }) => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const { setSelectedCategory } = useListingFilter();
  return (
    <TouchableOpacity
      onPress={() => setSelectedCategory(category.id)}
      style={[
        themedStyles.cardStyles.default,
        commonStyles.flexStyles.colCenter,
        {
          flex: 1,
          padding: 0,
          paddingVertical: 0,
          margin: 0,
          position: 'relative',
        },
      ]}
    >
      <ImageCover url={category.banner} />

      <BlurView
        style={commonStyles.absolutePositionStyles.absoluteFill}
        blurType="dark"
        blurAmount={1}
        reducedTransparencyFallbackColor="white"
      />

      <View
        style={[
          commonStyles.absolutePositionStyles.absoluteFill,
          commonStyles.flexStyles.colCenter,
          {
            height: '100%',
            flex: 1,
          },
        ]}
      >
        <TextStyled fontSize="h3" fontWeight="bold">
          {category.name}
        </TextStyled>
      </View>
    </TouchableOpacity>
  );
};

export default CardListingCategoryItem;
