import React, { useMemo } from "react";
import { Modal, Pressable } from "react-native";

import { BlurView } from "@react-native-community/blur";

import { useModalState } from "@/contexts/ModalContext";
import useAppStyles from "@/hooks/useAppStyles";

import ModalDeleteAccount from "./ModalDeleteAccount";
import ModalRemoveChat from "./ModalRemoveChat";
import ModalReportContent from "./ModalReportContent";

export const MODAL_CONTENTS = {
  ModalDeleteAccount: ModalDeleteAccount,
  ModalRemoveChat: ModalRemoveChat,
  ModalReportContent: ModalReportContent,
};

const ModalGlobal = () => {
  const { commonStyles } = useAppStyles();

  const { modalContent, setModalContent } = useModalState();

  const modalContentComponent = useMemo(() => {
    return modalContent ? MODAL_CONTENTS[modalContent] : null;
  }, [modalContent]);

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={!!modalContentComponent}
      onRequestClose={() => setModalContent(() => null)}
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
        onPress={() => setModalContent(() => null)}
      >
        {modalContentComponent
          ? React.createElement(modalContentComponent)
          : null}
      </Pressable>
    </Modal>
  );
};

export default ModalGlobal;
