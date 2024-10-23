import { View, Text, ScrollView } from 'react-native';
import CardPostItem from './CardPostItem';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { TextStyled } from '../typography';
import useCommonStyles from '@/hooks/useCommonStyles';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

const CardNewestPostings = () => {
  const commonStyles = useCommonStyles();
  const { height } = useSafeAreaFrame();
  return (
    <View style={{ height: height - 300 }}>
      <View
        style={[
          commonStyles.flexStyles.rowWrap,
          {
            marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp1,
          },
        ]}
      >
        <TextStyled fontSize="h4" fontWeight="bold">
          Newest Postings On
        </TextStyled>

        <TextStyled fontSize="h4" fontWeight="bold" customColor="primary">
          Real estate
        </TextStyled>
      </View>

      <ScrollView
        contentContainerStyle={{
          gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
          paddingBottom: APP_STYLE_VALUES.SPACE_SIZES.sp4,
        }}
      >
        <CardPostItem />
        <CardPostItem />
        <CardPostItem />

        <CardPostItem />
        <CardPostItem />
        <CardPostItem />
        <CardPostItem />
        <CardPostItem />
        <CardPostItem />
      </ScrollView>
    </View>
  );
};

export default CardNewestPostings;
