import { View } from "react-native";

import { router } from "expo-router";

import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STORAGE_KEYS from "@/constants/APP_STORAGE_KEYS";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useAppAuthSession } from "@/contexts/AuthContext";
import { useModalState } from "@/contexts/ModalContext";
import useAppStyles from "@/hooks/useAppStyles";
import { useStorageState } from "@/hooks/useStorageState";
import { useDeleteUserMutation } from "@/services/accountServices";
import { toastWarning } from "@/utils/toastUtils";

import { ButtonStyled } from "../button";
import Preloader from "../feedback/Preloader";
import ImageIconCircle from "../images/ImageIconCircle";
import ScrollViewStyled from "../override/ScrollViewStyled";
import IconClose from "../svg/icon/IconClose";
import IconDeleteAccount from "../svg/icon/IconDeleteAccount";
import { TextStyled } from "../typography";

const ModalEula = () => {
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme },
  } = useAppStyles();

  const [[isEulaAcceptedLoading, eulaAccepted], setEulaAccepted] =
    useStorageState(APP_STORAGE_KEYS.EULA_ACCEPTED);

  console.log("sec", eulaAccepted);

  const { setModalContent } = useModalState();

  const handleConfirm = async () => {
    try {
      await setEulaAccepted("true");
      setModalContent(() => null);
      router.push(APP_ROUTES.TABS.TIMELINE);
      toastWarning("");
    } catch (error) {
      console.log("error when deleteUser", error);
    }
  };

  return (
    <View
      style={{
        height: APP_STYLE_VALUES.WH_SIZES.xl20,
      }}
    >
      {isEulaAcceptedLoading ? (
        <Preloader />
      ) : (
        <View
          style={[
            themedStyles.cardStyles.default,
            commonStyles.flexStyles.colCenter,
            {
              borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.xl,
              width: APP_STYLE_VALUES.WH_SIZES.xl12,
              gap: APP_STYLE_VALUES.SPACE_SIZES.sp4,
            },
          ]}
        >
          <ScrollViewStyled
            contentContainerStyle={{
              flex: 1,
              height: 200,
            }}
          >
            <TextStyled
              customStyle={{
                width: APP_STYLE_VALUES.WH_SIZES.xl10,
                flexWrap: "wrap",
                height: "auto",
              }}
              fontSize="sm"
              fontWeight="semibold"
              customColor="grayScale900"
            >
              End User License Agreement (EULA) By downloading, accessing, or
              using Setuka24 (“Application”), you agree to be bound by the terms
              and conditions of this End User License Agreement (“EULA”). If you
              do not agree to these terms, do not use the Application. 1.
              License Grant Setuka24 grants you a limited, non-exclusive,
              non-transferable, revocable license to use the Application for
              personal, non-commercial purposes. 2. Prohibited Activities You
              agree not to: Upload, share, or post any objectionable, abusive,
              or illegal content. Engage in harassment, threats, or
              discrimination against other users. Violate any applicable laws or
              regulations. Attempt to interfere with the security or proper
              functioning of the Application. 3. User-Generated Content You are
              responsible for any content you post or share through the
              Application. By sharing content, you represent that: You own the
              content or have the necessary rights to share it. The content does
              not violate any third-party rights. The content does not contain
              objectionable material, including but not limited to hate speech,
              graphic violence, explicit content, or illegal material. We
              reserve the right to remove any content deemed objectionable or in
              violation of this EULA and to suspend or terminate the accounts of
              users responsible for such violations. 4. Reporting and Moderation
              Users can report objectionable content through the in-app
              reporting feature. Our moderation team will review reports
              promptly and take appropriate action, which may include content
              removal or user account suspension. 5. Privacy Your use of the
              Application is also governed by our Privacy Policy, which explains
              how we collect, use, and protect your information.
              https://setuka24.com/policy 6. Termination We reserve the right to
              terminate or suspend your access to the Application without notice
              if you violate any terms of this EULA. 7. Disclaimer of Warranties
              The Application is provided "as is" without warranties of any
              kind. We do not guarantee that the Application will be error-free
              or uninterrupted. 8. Limitation of Liability To the maximum extent
              permitted by law, Setuka24 shall not be liable for any damages
              arising out of your use or inability to use the Application. 9.
              Changes to this EULA We may update this EULA from time to time.
              Continued use of the Application constitutes your acceptance of
              any changes.
            </TextStyled>
          </ScrollViewStyled>

          <View
            style={{ gap: APP_STYLE_VALUES.SPACE_SIZES.sp2, width: "100%" }}
          >
            <ButtonStyled
              onPress={handleConfirm}
              variant="primarySolid"
              text="Yes, I'm sure."
            />
            <ButtonStyled
              onPress={() => {
                setModalContent(() => null);
                router.replace(APP_ROUTES.TABS.TIMELINE);
              }}
              variant="transparent"
              text="No"
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ModalEula;
