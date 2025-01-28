import { View } from "react-native";

import { router, useGlobalSearchParams } from "expo-router";

import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useModalState } from "@/contexts/ModalContext";
import useAppStyles from "@/hooks/useAppStyles";
import { useDeleteChatMutation } from "@/services/chatServices";
import { toastSuccess } from "@/utils/toastUtils";

import { ButtonStyled } from "../button";
import Preloader from "../feedback/Preloader";
import ImageIconCircle from "../images/ImageIconCircle";
import IconBlock from "../svg/icon/IconBlock";
import IconClose from "../svg/icon/IconClose";
import IconMessageFilled from "../svg/icon/filled/IconMessageFilled";
import { TextStyled } from "../typography";

interface IProps {}
const ModalReportContent: React.FC<IProps> = ({}) => {
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme },
  } = useAppStyles();
  const { setModalContent } = useModalState();

  const { listingId, profileId } = useGlobalSearchParams();

  const [deleteChat, { isLoading }] = useDeleteChatMutation();

  const contentId = listingId || profileId || "";
  const handleConfirm = async () => {
    try {
      // const result = await deleteChat((contentId as string) || "");
      setModalContent(() => null);
      toastSuccess("Content reported successfully");
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
            />
          </View>

          <IconBlock
            height={APP_STYLE_VALUES.WH_SIZES.xl3}
            width={APP_STYLE_VALUES.WH_SIZES.xl3}
            color={theme.primary}
          />
          <TextStyled
            fontSize="lg"
            fontWeight="semibold"
            customColor="grayScale900"
          >
            Are you sure, to block this content?
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

export default ModalReportContent;
