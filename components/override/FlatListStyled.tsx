import { FlatList, FlatListProps, View } from "react-native";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";

import EmptyState from "../feedback/EmptyState";
import SvgAnimLoadingSpinner from "../svg/animation/SvgAnimLoadingSpinner";
import { GradientBackground } from "../svg/background";

interface IProps<T> extends FlatListProps<T> {
  showGradients?: boolean;
  allowEmpty?: boolean;
  isLoading?: boolean;
}

const FlatListStyled = <T,>({
  allowEmpty = false,
  isLoading,
  data,
  showGradients = true,
  renderItem,
  ...others
}: IProps<T>) => {
  const {
    commonStyles,
    themeContext: { theme },
  } = useAppStyles();

  return (
    <View
      style={{
        height: "100%",
        flex: 1,
        position: "relative",
      }}
    >
      {showGradients && (
        <>
          <View
            style={[
              commonStyles.absolutePositionStyles.absoluteFill,
              {
                height: APP_STYLE_VALUES.WH_SIZES.sm,
                top: "auto",
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
        </>
      )}

      {isLoading ? (
        <SvgAnimLoadingSpinner />
      ) : data?.length ? (
        <FlatList
          {...others}
          keyboardShouldPersistTaps={"never"}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={(renderer) => (
            <View onStartShouldSetResponder={() => true}>
              {renderItem && renderItem(renderer)}
            </View>
          )}
          keyExtractor={(item, idx) => idx.toString()}
          nestedScrollEnabled={true}
          contentContainerStyle={[
            {
              gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
              paddingBottom: APP_STYLE_VALUES.SPACE_SIZES.sp15,
            },
            others.contentContainerStyle,
          ]}
        />
      ) : (
        !allowEmpty && <EmptyState />
      )}
    </View>
  );
};

export default FlatListStyled;
