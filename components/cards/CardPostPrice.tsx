import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import { View } from 'react-native';
import ImageIconCircle from '../images/ImageIconCircle';
import { TextStyled } from '../typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import IListingPrice from '@/interfaces/listing/IListingPrice';
import IconTag from '../svg/icon/IconTag';
import { useAppTheme } from '@/contexts/ThemeContext';

interface IProps {
  negotiable: boolean;
  price: IListingPrice;
}
const CardPostPrice: React.FC<IProps> = ({ price, negotiable }) => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const { theme } = useAppTheme();

  console.log('price', price);

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
          <ImageIconCircle icon={<IconTag color={theme.grayScale900} />} />
        </View>

        <View style={commonStyles.flexStyles.colStart}>
          <TextStyled fontSize="h4" fontWeight="bold">
            {price?.amount + ' ' + (price?.currency as string) || ''}
          </TextStyled>
          <TextStyled
            fontSize="sm"
            fontWeight="medium"
            customColor="grayScale500"
          >
            {negotiable ? 'Negotiable' : 'Not Negotiable'}
          </TextStyled>
        </View>
      </View>
    </View>
  );
};

export default CardPostPrice;
