import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import { View } from 'react-native';
import ImageIconCircle from '../images/ImageIconCircle';
import { TextStyled } from '../typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import IListingCategory from '@/interfaces/listing/IListingCategory';
import { useMemo } from 'react';
import { find, map } from 'lodash';
import IconHome from '../svg/icon/IconHome';
import { useAppTheme } from '@/contexts/ThemeContext';
import IconVehicle from '../svg/icon/IconVehicle';
import IconCamera from '../svg/icon/IconCamera';
import IconMegaphone from '../svg/icon/IconMegaphone';

interface IProps {
  categories: IListingCategory[];
}
const CardPostCategory: React.FC<IProps> = ({ categories }) => {
  const { theme } = useAppTheme();
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();

  const parentCategory = useMemo(() => {
    return find(categories, (c) => c.parentCategoryId === null);
  }, [categories]);

  const categoryIcon = useMemo(() => {
    let icon = <IconMegaphone color={theme.grayScale900} />;

    switch (parentCategory?.name) {
      case 'Real Estate':
        icon = <IconHome color={theme.grayScale900} />;
        break;
      case 'Cars':
        icon = <IconVehicle color={theme.grayScale900} />;
        break;
      case 'Electronics':
        icon = <IconCamera color={theme.grayScale900} />;
        break;
      default:
        icon = <IconMegaphone color={theme.grayScale900} />;
        break;
    }
    return icon;
  }, [parentCategory, theme]);

  console.log('categories', parentCategory);
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
          <ImageIconCircle bgColor={'grayScale300'} icon={categoryIcon} />
          {/* <SvgUri uri={parentCategory?.icon || ''} /> */}
        </View>

        <View style={commonStyles.flexStyles.colStart}>
          <TextStyled fontSize="h4" fontWeight="bold">
            {parentCategory?.name || ''}
          </TextStyled>
          <View>
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
    </View>
  );
};

export default CardPostCategory;
