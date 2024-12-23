import { View } from "react-native";

import { Href, Link, router } from "expo-router";

import { ButtonStyled } from "@/components/button";
import { InnerCommonContainer } from "@/components/containers";
import ScreenWrapperContainer from "@/components/containers/ScreenWrapperContainer";
import { WelcomeBackgroundPattern } from "@/components/svg/background";
import { getIconWithProps } from "@/components/svg/icon";
import { TextScanEffect } from "@/components/typography";
import TextStyled from "@/components/typography/TextStyled";
import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";

const WelcomeScreen = () => {
  const {
    commonStyles,
    themeContext: { theme },
  } = useAppStyles();

  const handleSignButtonClick = (type: "REGISTER" | "LOGIN") => {
    router.push(APP_ROUTES.PUBLIC[type] as Href<string | object>);
  };

  return (
    <ScreenWrapperContainer>
      <View
        style={[
          commonStyles.absolutePositionStyles.absoluteFill,
          commonStyles.flexStyles.flexCenter,
        ]}
      >
        <WelcomeBackgroundPattern />
      </View>

      <InnerCommonContainer>
        <View
          style={[
            commonStyles.flexStyles.selfCenter,
            commonStyles.flexStyles.colBetween,
            { flex: 1, width: "100%" },
          ]}
        >
          <View style={[commonStyles.flexStyles.flexCenter]}>
            <View
              style={[
                commonStyles.flexStyles.selfCenter,
                commonStyles.flexStyles.rowCenterWrap,
                { maxWidth: APP_STYLE_VALUES.WH_SIZES.xl10 },
              ]}
            >
              {getIconWithProps("IconLogoPrimary", { color: theme.primary })}

              <TextStyled
                fontSize="xl"
                fontWeight="regular"
                customColor="grayScale600"
              >
                Sell What You Have,
              </TextStyled>
              <View
                style={[
                  { margin: APP_STYLE_VALUES.SPACE_SIZES.sp1, marginBottom: 0 },
                ]}
              >
                <TextScanEffect />
              </View>
              <TextStyled
                fontSize="xl"
                fontWeight="regular"
                customColor="grayScale600"
              >
                What You Need
              </TextStyled>
            </View>
          </View>

          <View style={[{ gap: APP_STYLE_VALUES.SPACE_SIZES.sp3 }]}>
            <ButtonStyled
              onPress={() => {
                handleSignButtonClick("LOGIN");
              }}
              text={"Login"}
              variant="primarySolid"
            />

            <ButtonStyled
              gradientBg={true}
              onPress={() => handleSignButtonClick("REGISTER")}
              text="Register"
              variant={"primaryOutlined"}
            />

            <TextStyled fontSize="xl" fontWeight="regular">
              or
            </TextStyled>

            <Link
              style={[commonStyles.flexStyles.selfCenter]}
              href={APP_ROUTES.TABS.TIMELINE}
            >
              <TextStyled
                fontSize="xl"
                fontWeight="regular"
                customColor="grayScale600"
                textAlignment="center"
              >
                Continue without signin
              </TextStyled>
            </Link>
          </View>
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default WelcomeScreen;