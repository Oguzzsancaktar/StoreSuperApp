import React from "react";
import { View } from "react-native";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useAppAuthSession } from "@/contexts/AuthContext";
import { useModalState } from "@/contexts/ModalContext";
import useAppStyles from "@/hooks/useAppStyles";
import { useDeleteUserMutation } from "@/services/accountServices";
import { toastWarning } from "@/utils/toastUtils";

import { ButtonStyled } from "../button";
import Preloader from "../feedback/Preloader";
import ImageIconCircle from "../images/ImageIconCircle";
import IconClose from "../svg/icon/IconClose";
import IconDeleteAccount from "../svg/icon/IconDeleteAccount";
import { TextStyled } from "../typography";

const ModalDeleteAccount = () => {
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme },
  } = useAppStyles();

  const { setModalContent } = useModalState();

  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const { userTokenInfo, signOut } = useAppAuthSession();

  const handleConfirm = async () => {
    try {
      const result = await deleteUser(userTokenInfo?.Id || "");
      setModalContent(() => null);
      toastWarning("");
      if (!result.error) {
        signOut();
      }
      console.log("result", result);
    } catch (error) {
      console.log("error when deleteUser", error);
    }
  };

  return (
    <View>
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
              onPress={() => setModalContent(null)}
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
              onPress={() => setModalContent(() => null)}
              variant="transparent"
              text="No"
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ModalDeleteAccount;
