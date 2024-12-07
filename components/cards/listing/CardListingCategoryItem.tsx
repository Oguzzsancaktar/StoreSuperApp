import { TouchableOpacity, View } from 'react-native';
import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import { TextStyled } from '../../typography';
import IListingCategory from '@/interfaces/listing/IListingCategory';
import ImageStyled from '../../images/ImageStyled';
import { BlurView } from '@react-native-community/blur';
import { useAppTheme } from '@/contexts/ThemeContext';
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
      onPress={() => onPress(category?.id)}
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
      <ImageStyled url={category.banner} />

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
