import { useMemo } from "react";
import { View } from "react-native";

import { find, map } from "lodash";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";
import IListingCategory from "@/interfaces/listing/IListingCategory";
import IListingPost from "@/interfaces/listing/IListingPost";

import ImageIconCircle from "../images/ImageIconCircle";
import IconCamera from "../svg/icon/IconCamera";
import IconHome from "../svg/icon/IconHome";
import IconMegaphone from "../svg/icon/IconMegaphone";
import IconVehicle from "../svg/icon/IconVehicle";
import { TextStyled } from "../typography";

interface IProps {
  categories: IListingCategory[];
  tags: IListingPost["tags"];
}
const CardPostCategory: React.FC<IProps> = ({ tags, categories }) => {
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme, toggleTheme },
  } = useAppStyles();

  console.log(" tags, categories", tags, categories);

  const parentCategory = useMemo(() => {
    return find(categories, (c) => c.parentCategoryId === null);
  }, [categories]);

  const categoryIcon = useMemo(() => {
    let icon = <IconMegaphone color={theme.grayScale900} />;

    switch (parentCategory?.name) {
      case "Real Estate":
        icon = <IconHome color={theme.grayScale900} />;
        break;
      case "Cars":
        icon = <IconVehicle color={theme.grayScale900} />;
        break;
      case "Electronics":
        icon = <IconCamera color={theme.grayScale900} />;
        break;
      default:
        icon = <IconMegaphone color={theme.grayScale900} />;
        break;
    }
    return icon;
  }, [parentCategory, theme]);

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
          <ImageIconCircle bgColor={"grayScale300"} icon={categoryIcon} />
          {/* <SvgUri uri={parentCategory?.icon || ''} /> */}
        </View>

        <View style={[commonStyles.flexStyles.colCenter]}>
          <TextStyled customStyle={{ flex: 1 }} fontSize="h4" fontWeight="bold">
            {parentCategory?.name || ""}
          </TextStyled>
          {tags?.length ? (
            <TextStyled
              fontSize="sm"
              textAlignment="left"
              fontWeight="medium"
              customColor="grayScale500"
            >
              {map(tags, (tag) => {
                return tag + " ";
              })}
            </TextStyled>
          ) : (
            ""
          )}
        </View>
      </View>
    </View>
  );
};

export default CardPostCategory;
