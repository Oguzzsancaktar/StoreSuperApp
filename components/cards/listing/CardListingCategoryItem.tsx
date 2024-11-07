import { TouchableOpacity, View } from 'react-native';
import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import ISelectOption from '@/interfaces/theme/ISelectOption';
import { TextStyled } from '../../typography';
import IListingCategory from '@/interfaces/listing/IListingCategory';
import ImageCover from '../../images/ImageCover';
import { BlurView } from '@react-native-community/blur';
import { useListingFilter } from '@/contexts/ListingFilterContext';
import { useAppTheme } from '@/contexts/ThemeContext';
import { useMemo } from 'react';
import APP_THEMES, { COMMON_COLOURS } from '@/constants/APP_THEMES';
import { GradientBackground } from '@/components/svg/background';

interface IProps {
  category: IListingCategory;
  onPress(categoryId: IListingCategory['id']): void;
  isSelected?: boolean;
}
const CardListingCategoryItem: React.FC<IProps> = ({
  onPress,
  category,
  isSelected,
}) => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const { isDark } = useAppTheme();

  return (
    <TouchableOpacity
      onPress={() => onPress(category.id)}
      style={[
        themedStyles.cardStyles[isSelected ? 'primary' : 'default'],
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

      {isSelected && <GradientBackground />}

      <BlurView
        style={commonStyles.absolutePositionStyles.absoluteFill}
        blurType={isDark ? 'dark' : 'xlight'}
        blurAmount={2}
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
        <TextStyled fontSize="h5" fontWeight="medium">
          {category.name}
        </TextStyled>
      </View>
    </TouchableOpacity>
  );
};

export default CardListingCategoryItem;
