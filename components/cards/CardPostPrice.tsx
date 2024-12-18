import { View } from "react-native";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";

import ImageIconCircle from "../images/ImageIconCircle";
import IconTag from "../svg/icon/IconTag";
import { TextStyled } from "../typography";

interface IProps {
  negotiable: boolean;
  formattedPrice: string;
}
const CardPostPrice: React.FC<IProps> = ({ negotiable, formattedPrice }) => {
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme },
  } = useAppStyles();

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
          <ImageIconCircle
            bgColor={"grayScale300"}
            icon={<IconTag color={theme.grayScale900} />}
          />
        </View>

        <View style={commonStyles.flexStyles.colStart}>
          <TextStyled fontSize="h4" fontWeight="bold">
            {formattedPrice}
          </TextStyled>
          <View>
            <TextStyled
              fontSize="sm"
              fontWeight="medium"
              customColor="grayScale500"
              textAlignment="left"
            >
              {negotiable ? "Negotiable" : "Not Negotiable"}
            </TextStyled>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardPostPrice;
