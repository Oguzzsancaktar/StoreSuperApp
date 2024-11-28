import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import { View } from 'react-native';
import ImageIconCircle from '../images/ImageIconCircle';
import { TextStyled } from '../typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import IconWorld from '../svg/icon/IconWorld';
import IListingCategory from '@/interfaces/listing/IListingCategory';
import { useMemo } from 'react';
import { find, map } from 'lodash';
import ImageStyled from '../images/ImageStyled';
import { SvgUri } from 'react-native-svg';

interface IProps {
  categories: IListingCategory[];
}
const CardPostCategory: React.FC<IProps> = ({ categories }) => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();

  console.log('categories', categories);

  const parentCategory = useMemo(() => {
    return find(categories, (c) => c.parentCategoryId === null);
  }, [categories]);

  return (
    <View
      style={[
        themedStyles.cardStyles.default,
        commonStyles.flexStyles.colBetween,
        {
          paddingTop: APP_STYLE_VALUES.SPACE_SIZES.sp2,
          paddingVertical: APP_STYLE_VALUES.SPACE_SIZES.sp2,
        },
      ]}
    >
      <View
        style={[
          commonStyles.flexStyles.rowStart,
          {
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
          },
        ]}
      >
        <View style={{ width: APP_STYLE_VALUES.WH_SIZES.sm }}>
          <ImageIconCircle icon={<SvgUri uri={parentCategory?.icon || ''} />} />
        </View>

        <View style={commonStyles.flexStyles.colStart}>
          <TextStyled fontSize="h4" fontWeight="bold">
            {parentCategory?.name || ''}
          </TextStyled>
          <TextStyled
            fontSize="sm"
            fontWeight="medium"
            customColor="grayScale500"
          >
            {map(categories, (cat) => {
              if (cat.parentCategoryId) {
                return cat.name + ' ';
              }
              return '';
            })}
          </TextStyled>
        </View>
      </View>
    </View>
  );
};

export default CardPostCategory;
