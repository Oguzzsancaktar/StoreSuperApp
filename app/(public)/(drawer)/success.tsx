import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Href, router, useLocalSearchParams } from "expo-router";

import { ButtonStyled } from "@/components/button";
import { InnerCommonContainer } from "@/components/containers";
import ScreenWrapperContainer from "@/components/containers/ScreenWrapperContainer";
import SvgAnimSuccessCheck from "@/components/svg/animation/SvgAnimSuccessCheck";
import { WelcomeBackgroundPattern } from "@/components/svg/background";
import { TextStyled } from "@/components/typography";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";

interface IProps {}

interface ISuccessParamList {
  title: string;
  description: string;
  href: Href;
}

const SuccessScreen: React.FC<IProps> = () => {
  const {
    title,
    description,
    href,
    showExtraButton = false,
    extraButtonText,
    extraButtonHref,
  } = useLocalSearchParams();
  const { t } = useTranslation();
  const { commonStyles } = useAppStyles();
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
            commonStyles.flexStyles.colCenter,
            { flex: 1, gap: APP_STYLE_VALUES.SPACE_SIZES.sp5 },
          ]}
        >
          <View
            style={{
              height: APP_STYLE_VALUES.WH_SIZES.xl6,
            }}
          >
            <SvgAnimSuccessCheck />
          </View>

          <View style={{ marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp20 }}>
            <TextStyled
              fontSize="h3"
              fontWeight="medium"
              customColor="grayScale900"
            >
              {title}
            </TextStyled>

            <TextStyled
              fontSize="lg"
              fontWeight="medium"
              customColor="grayScale600"
            >
              {description}
            </TextStyled>
          </View>

          <View
            style={{ width: "100%", gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 }}
          >
            {showExtraButton && (
              <ButtonStyled
                onPress={() => router.replace(extraButtonHref as Href)}
                variant="primaryOutlined"
                gradientBg={true}
                text={extraButtonText as string}
              />
            )}

            <ButtonStyled
              onPress={() => router.replace(href as Href)}
              variant="primaryOutlined"
              gradientBg={true}
              text={t("common.home")}
            />
          </View>
        </View>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default SuccessScreen;
