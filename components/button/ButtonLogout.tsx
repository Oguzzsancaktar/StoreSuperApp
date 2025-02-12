import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { router } from "expo-router";

import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useAppAuthSession } from "@/contexts/AuthContext";
import useAppStyles from "@/hooks/useAppStyles";

import IconLogout from "../svg/icon/IconLogout";
import { TextStyled } from "../typography";
import ButtonStyled from "./ButtonStyled";

interface IProps {}
const ButtonLogout: React.FC<IProps> = () => {
  const { t } = useTranslation();
  const { authToken, signOut } = useAppAuthSession();
  const {
    commonStyles,
    themeContext: { theme },
  } = useAppStyles();

  const handlePress = () => {
    if (!authToken) {
      router.replace(APP_ROUTES.PUBLIC.UNAUTHORIZED.LOGIN);
    } else {
      signOut();
      router.push(APP_ROUTES.PUBLIC.UNAUTHORIZED.WELCOME);
    }
  };
  return (
    <ButtonStyled
      onPress={handlePress}
      gradientBg={true}
      variant="primaryOutlined"
    >
      <View
        style={[
          commonStyles.flexStyles.rowCenterWrap,
          { width: "100%", gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
        ]}
      >
        <View
          style={[
            commonStyles.flexStyles.rowStart,
            { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
          ]}
        >
          {authToken && <IconLogout color={theme.grayScale900} />}
          <View>
            <TextStyled
              textAlignment="left"
              fontSize="lg"
              fontWeight="semibold"
              customColor="grayScale900"
            >
              {authToken ? t("common.logout") : t("common.login")}
            </TextStyled>
          </View>
        </View>
      </View>
    </ButtonStyled>
  );
};

export default ButtonLogout;
