import { FlatList, FlatListProps, View } from 'react-native';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { GradientBackground } from '../svg/background';
import useCommonStyles from '@/hooks/useCommonStyles';
import { useAppTheme } from '@/contexts/ThemeContext';

interface IProps<T> extends FlatListProps<T> {}

const ListFlatStyled = <T,>({ data, renderItem, ...others }: IProps<T>) => {
  const { theme } = useAppTheme();
  const commonStyles = useCommonStyles();
  console.log('others', others);
  return (
    <View
      style={{
        height: '100%',
        flex: 1,
        position: 'relative',
      }}
    >
      <View
        style={[
          commonStyles.absolutePositionStyles.absoluteFill,
          {
            height: APP_STYLE_VALUES.WH_SIZES.sm,
            // @todo create constant for zIndexes
            zIndex: 1,
          },
        ]}
      >
        <GradientBackground
          endColor={theme.appBackground}
          startColor={theme.appBackground}
          startOpacity="0.5"
          endOpacity="0"
        />
      </View>

      <View
        style={[
          commonStyles.absolutePositionStyles.absoluteFill,
          {
            height: APP_STYLE_VALUES.WH_SIZES.sm,
            top: 'auto',
            // @todo create constant for zIndexes
            zIndex: 1,
          },
        ]}
      >
        <GradientBackground
          endColor={theme.appBackground}
          startColor={theme.appBackground}
          startOpacity="0"
          endOpacity="0.5"
        />
      </View>

      <FlatList
        {...others}
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, idx) => idx.toString()}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        contentContainerStyle={{ gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 }}
      />
    </View>
  );
};

export default ListFlatStyled;
