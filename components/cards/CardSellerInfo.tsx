import { Pressable, View } from "react-native";

import { Href, router } from "expo-router";
import moment from "moment";

import APP_FORMATS from "@/constants/APP_FORMATS";
import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";
import IUser from "@/interfaces/account/IUser";
import routerUtils from "@/utils/routerUtils";

import ImageIconCircle from "../images/ImageIconCircle";
import IconChatSupport from "../svg/icon/IconChatSupport";
import IconUser from "../svg/icon/IconUser";
import { TextStyled } from "../typography";

interface IProps {
  user: IUser;
  allowPhoneCalls: boolean;
  allowMessaging: boolean;
}
const CardSellerInfo: React.FC<IProps> = ({
  allowPhoneCalls = false,
  allowMessaging = false,
  user = {} as IUser,
}) => {
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme },
  } = useAppStyles();

  const handleCardPress = () => {
    router.push(
      routerUtils.buildRoute(APP_ROUTES.PUBLIC.DRAWER.PROFILE, {
        profileId: user?.id,
      }),
    );
  };

  return (
    <Pressable
      onPress={handleCardPress}
      style={themedStyles.cardStyles.default}
    >
      {(allowMessaging || allowPhoneCalls) && (
        <View
          style={[
            commonStyles.flexStyles.rowStart,
            themedStyles.borderStyles.bottomUnderline,
            {
              gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
              paddingBottom: APP_STYLE_VALUES.SPACE_SIZES.sp4,
            },
          ]}
        >
          <View
            style={[
              commonStyles.flexStyles.flexCenter,
              { width: APP_STYLE_VALUES.WH_SIZES.sm },
            ]}
          >
            <ImageIconCircle
              bgColor={"grayScale300"}
              icon={<IconChatSupport color={theme.grayScale900} />}
            />
          </View>

          <View
            style={
              (commonStyles.flexStyles.colStart, { width: "100%", flex: 1 })
            }
          >
            <TextStyled
              fontSize="h6"
              fontWeight="medium"
              customColor="grayScale400"
              textAlignment="left"
            >
              Contact Information
            </TextStyled>
            <TextStyled fontSize="h4" fontWeight="bold" textAlignment="left">
              {(allowPhoneCalls && user?.phoneNumber && user?.phoneNumber) ||
                ""}
            </TextStyled>

            <TextStyled fontSize="h4" fontWeight="bold" textAlignment="left">
              {(allowMessaging && user?.email && user?.email) || ""}
            </TextStyled>
          </View>
        </View>
      )}

      <View
        style={[
          commonStyles.flexStyles.rowStart,
          {
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            paddingTop: APP_STYLE_VALUES.SPACE_SIZES.sp4,
          },
        ]}
      >
        <View style={{ width: APP_STYLE_VALUES.WH_SIZES.sm }}>
          <ImageIconCircle
            bgColor={"grayScale300"}
            icon={<IconUser color={theme.grayScale900} />}
          />
        </View>

        <View style={commonStyles.flexStyles.colStart}>
          {/* <TextStyled
            fontSize="h6"
            fontWeight="medium"
            customColor="grayScale400"
          >
            Owner
          </TextStyled> */}
          <View>
            <TextStyled fontSize="h4" fontWeight="bold">
              {user?.firstName && user?.lastName
                ? user?.firstName + " " + user?.lastName
                : ""}
            </TextStyled>
          </View>
          <TextStyled
            fontSize="sm"
            fontWeight="medium"
            customColor="grayScale500"
          >
            Member since,{" "}
            {moment(user.created).format(APP_FORMATS.DATE_MOMENT_NAME)}
          </TextStyled>
        </View>
      </View>
    </Pressable>
  );
};

export default CardSellerInfo;
