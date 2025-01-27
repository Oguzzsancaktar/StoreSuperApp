import { useMemo } from "react";
import { Modal, Pressable, View } from "react-native";

import { BlurView } from "@react-native-community/blur";
import { router } from "expo-router";

import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useAppAuthSession } from "@/contexts/AuthContext";
import { useModalState } from "@/contexts/ModalContext";
import useAppStyles from "@/hooks/useAppStyles";
import { useDeleteUserMutation } from "@/services/accountServices";
import { useDeleteChatMutation } from "@/services/chatServices";
import jwtUtils from "@/utils/jwtUtils";
import { toastWarning } from "@/utils/toastUtils";

import { ButtonStyled } from "../button";
import Preloader from "../feedback/Preloader";
import ImageIconCircle from "../images/ImageIconCircle";
import IconClose from "../svg/icon/IconClose";
import IconDeleteAccount from "../svg/icon/IconDeleteAccount";
import IconMessageFilled from "../svg/icon/filled/IconMessageFilled";
import { TextStyled } from "../typography";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chatRegistryId: string;
}
const ModalRemoveChat: React.FC<IProps> = ({
  chatRegistryId,
  isModalOpen,
  setIsModalOpen,
}) => {
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme },
  } = useAppStyles();

  const [deleteChat, { isLoading }] = useDeleteChatMutation();

  const handleConfirm = async () => {
    try {
      const result = await deleteChat(chatRegistryId || "");
      setIsModalOpen(false);
      router.replace(APP_ROUTES.TABS.CONVERSATIONS);
      console.log("result chat deete", result);
    } catch (error) {
      console.log("error when deleteUser", error);
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isModalOpen}
      onRequestClose={() => setIsModalOpen(() => false)}
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
        onPress={() => setIsModalOpen(() => false)}
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

            <IconMessageFilled
              height={APP_STYLE_VALUES.WH_SIZES.xl3}
              width={APP_STYLE_VALUES.WH_SIZES.xl3}
              color={theme.primary}
            />
            <TextStyled
              fontSize="lg"
              fontWeight="semibold"
              customColor="grayScale900"
            >
              Are you sure, to delete this chat?
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
                onPress={() => setIsModalOpen(() => false)}
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

export default ModalRemoveChat;
