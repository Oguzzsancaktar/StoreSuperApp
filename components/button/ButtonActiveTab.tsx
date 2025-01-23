import { useMemo } from "react";
import { TouchableOpacity, View, useWindowDimensions } from "react-native";

import { Href, useRouter } from "expo-router";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { COMMON_COLOURS } from "@/constants/APP_THEMES";
import { useListingFilter } from "@/contexts/ListingFilterContext";
import useAppStyles from "@/hooks/useAppStyles";

import { TextStyled } from "../typography";

interface IProps {
  icon: any;
  text: string;
  isActive: boolean;
  to: Href<string | object>;
}
const ButtonActiveTab: React.FC<IProps> = ({ icon, text, isActive, to }) => {
  const {
    commonStyles,
    themeContext: { theme },
  } = useAppStyles();
  const { width } = useWindowDimensions();

  const router = useRouter();
  const { filterValues, setFilterValues } = useListingFilter();

  const isPrimaryButton = useMemo(() => {
    return to === "/addPost";
  }, [to]);

  const handlePress = () => {
    // if (to === '/profile') {
    //   setUseSafeArea(false);
    // } else {
    //   setUseSafeArea(true);
    // }

    if (to === "/postList" && isActive) {
      setFilterValues({ category: undefined });
    }
    router.push(to);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        commonStyles.flexStyles.colCenter,
        {
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isPrimaryButton
            ? theme.primary
            : COMMON_COLOURS.transparent,
          width: isPrimaryButton
            ? APP_STYLE_VALUES.WH_SIZES.lg
            : (width -
                APP_STYLE_VALUES.WH_SIZES.lg -
                APP_STYLE_VALUES.SPACE_SIZES.sp4 * 2 -
                APP_STYLE_VALUES.SPACE_SIZES.sp2 * 2) /
              4,
          marginTop: isPrimaryButton ? -APP_STYLE_VALUES.SPACE_SIZES.sp2 : 0,
          height: isPrimaryButton ? APP_STYLE_VALUES.WH_SIZES.lg : "100%",
          padding: APP_STYLE_VALUES.SPACE_SIZES.sp1,
          borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.full,
        },
      ]}
    >
      <View
        style={[
          commonStyles.flexStyles.flexCenter,
          {
            width: APP_STYLE_VALUES.WH_SIZES.xs,
            height: APP_STYLE_VALUES.WH_SIZES.xs,
          },
        ]}
      >
        {icon({
          color:
            isActive && !isPrimaryButton
              ? theme.primary
              : isPrimaryButton
                ? theme.white
                : theme.grayScale900,
        })}
      </View>

      {text !== "" && (
        <TextStyled
          fontSize="sm"
          fontWeight="medium"
          customColor={isActive ? "primary" : "grayScale900"}
        >
          {text}
        </TextStyled>
      )}
    </TouchableOpacity>
  );
};

export default ButtonActiveTab;
