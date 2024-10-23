import { View } from 'react-native';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import FilterSearchbar from '@/components/filters/FilterSearchbar';
import FilterStuffType from '@/components/filters/FilterStuffType';
import CardMostSearchedWords from '@/components/cards/CardMostSearchedWords';
import CardNewestPostings from '@/components/cards/CardNewestPostings';
import useCommonStyles from '@/hooks/useCommonStyles';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useAppTheme } from '@/contexts/ThemeContext';
import { InnerCommonContainer } from '@/components/containers';
import useThemedStyles from '@/hooks/useThemedStyles';

export default function TimelineScreen() {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const { theme } = useAppTheme();

  return (
    <ScreenWrapperContainer>
      <InnerCommonContainer>
        <View>
          <View
            style={[
              commonStyles.flexStyles.rowWrap,
              themedStyles.borderStyles.primary,

              {
                borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.md,
                padding: APP_STYLE_VALUES.SPACE_SIZES.sp2,
                gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
                borderColor: theme.primary,
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <FilterSearchbar />
            </View>
            <View style={{ width: 150 }}>
              <FilterStuffType />
            </View>
          </View>

          <View style={{ marginVertical: APP_STYLE_VALUES.SPACE_SIZES.sp4 }}>
            <CardMostSearchedWords />
          </View>

          <CardNewestPostings />
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
}
