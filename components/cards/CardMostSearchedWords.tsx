import { View } from 'react-native';
import { TextStyled } from '../typography';
import useCommonStyles from '@/hooks/useCommonStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import ButtonBadge from '../button/ButtonBadge';

const CardMostSearchedWords = () => {
  const commonStyles = useCommonStyles();
  return (
    <View>
      <View
        style={[
          commonStyles.flexStyles.rowWrap,
          {
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp1,
            marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp1,
          },
        ]}
      >
        <TextStyled fontSize="h4" fontWeight="bold">
          Most
        </TextStyled>
        <TextStyled fontSize="h4" fontWeight="bold" customColor="primary">
          Searched
        </TextStyled>
      </View>

      <View
        style={[
          commonStyles.flexStyles.rowWrap,
          { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
        ]}
      >
        <ButtonBadge text={'Bmw'} />
        <ButtonBadge text={'Audi'} />
        <ButtonBadge text={'Rental'} />
      </View>
    </View>
  );
};

export default CardMostSearchedWords;
