import { useMemo } from "react";
import { Modal, Pressable, View } from "react-native";

import { BlurView } from "@react-native-community/blur";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useAppAuthSession } from "@/contexts/AuthContext";
import { useModalState } from "@/contexts/ModalContext";
import useAppStyles from "@/hooks/useAppStyles";
import { useDeleteUserMutation } from "@/services/accountServices";
import jwtUtils from "@/utils/jwtUtils";
import { toastWarning } from "@/utils/toastUtils";

import { ButtonStyled } from "../button";
import Preloader from "../feedback/Preloader";
import ImageIconCircle from "../images/ImageIconCircle";
import IconClose from "../svg/icon/IconClose";
import IconDeleteAccount from "../svg/icon/IconDeleteAccount";
import { TextStyled } from "../typography";

const ModalGlobal = () => {
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme },
  } = useAppStyles();

  const { isModalOpen, toggleModal } = useModalState();

  const { userTokenInfo, signOut } = useAppAuthSession();

  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleConfirm = async () => {
    try {
      const result = await deleteUser(userTokenInfo?.Id || "");
      toggleModal();
      toastWarning("");
      if (!result.error) {
        signOut();
      }
      console.log("result", result);
    } catch (error) {
      console.log("error when deleteUser", error);
    }
  };

  // @todo
  // 1- select modal content with keys or send from toggle

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isModalOpen}
      onRequestClose={toggleModal}
    >
      {/* Blur Overlay */}
      <BlurView
        style={commonStyles.absolutePositionStyles.absoluteFill}
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />

      <Pressable
        style={[commonStyles.flexStyles.flexCenter, { flex: 1 }]}
        onPress={toggleModal}
      >
        {isLoading ? (
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
            <View style={{ alignSelf: "flex-end" }}>
              <ImageIconCircle
                size={APP_STYLE_VALUES.WH_SIZES.sm}
                icon={<IconClose color={theme.grayScale900} />}
                bgColor="transparent"
              />
            </View>

            <IconDeleteAccount color={theme.primary} />
            <TextStyled
              fontSize="lg"
              fontWeight="semibold"
              customColor="grayScale900"
            >
              Are you sure, to delete your account?
            </TextStyled>

            <View
              style={{ gap: APP_STYLE_VALUES.SPACE_SIZES.sp2, width: "100%" }}
            >
              <ButtonStyled
                onPress={handleConfirm}
                variant="primarySolid"
                text="Yes, I'm sure."
              />
              <ButtonStyled
                onPress={toggleModal}
                variant="transparent"
                text="No"
              />
            </View>
          </View>
        )}
      </Pressable>
    </Modal>
  );
};

export default ModalGlobal;
