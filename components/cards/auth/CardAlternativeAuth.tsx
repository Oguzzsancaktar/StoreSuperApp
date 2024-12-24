import { View } from "react-native";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Link } from "expo-router";

import ImageIconCircle from "@/components/images/ImageIconCircle";
import IconSocialApple from "@/components/svg/icon/IconSocialApple";
import IconSocialFacebook from "@/components/svg/icon/IconSocialFacebook";
import IconSocialGoogle from "@/components/svg/icon/IconSocialGoogle";
import { TextStyled } from "@/components/typography";
import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useAppAuthSession } from "@/contexts/AuthContext";
import useAppStyles from "@/hooks/useAppStyles";
import {
  useLoginWithGoogleMutation,
  useRegisterAccountMutation,
} from "@/services/accountServices";
import { toastError, toastWarning } from "@/utils/toastUtils";

interface IProps {
  authType: "LOGIN" | "REGISTER";
}

type ISocialLoginTypes = "FACEBOOK" | "APPLE" | "GOOGLE";

const CardAlternativeAuth: React.FC<IProps> = ({ authType }) => {
  const { signIn } = useAppAuthSession();
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme },
  } = useAppStyles();

  const [createAccount, { isLoading: registerIsLoading }] =
    useRegisterAccountMutation();

  const [loginWithGoogle, { isLoading: loginWithGoogleIsLoading }] =
    useLoginWithGoogleMutation();

  const signInSocial = async (type: ISocialLoginTypes) => {
    switch (type) {
      case "GOOGLE":
        GoogleSignin.configure({
          // androidClientId: 'ADD_YOUR_ANDROID_CLIENT_ID_HERE',
          // @todo get it from env for secure
          iosClientId:
            "877906952522-4t2qllnb7doo0vg09fat26ha13t8lfsq.apps.googleusercontent.com",
        });
        GoogleSignin.hasPlayServices()
          .then((hasPlayService) => {
            if (hasPlayService) {
              GoogleSignin.signIn()
                .then(async (userInfo) => {
                  const userInformation = userInfo?.data?.user;

                  if (userInformation) {
                    const loginWithGoogleResult = await loginWithGoogle(
                      userInfo?.data?.idToken || "",
                    ).unwrap();

                    if (loginWithGoogleResult) {
                      signIn(loginWithGoogleResult);
                    }
                  }
                })
                .catch((e) => {
                  toastError(e?.data?.message || JSON.stringify(e));
                  console.log("ERROR IS: " + JSON.stringify(e));
                });
            }
          })
          .catch((e) => {
            toastError(e?.data?.message || JSON.stringify(e));
            console.log("ERROR IS: " + JSON.stringify(e));
          });
        break;

      case "APPLE":
        toastWarning("This option will be available soon");
        break;

      case "FACEBOOK":
        toastWarning("This option will be available soon");
        break;

      default:
        break;
    }
  };

  return (
    <View style={{ marginVertical: APP_STYLE_VALUES.SPACE_SIZES.sp5 }}>
      <View
        style={[
          commonStyles.absolutePositionStyles.absoluteFill,
          {
            height: 1,
            backgroundColor: theme.grayScale400,
            top: 8,
          },
        ]}
      />
      <View
        style={[
          commonStyles.flexStyles.selfCenter,
          {
            backgroundColor: theme.appBackground,
            width: APP_STYLE_VALUES.WH_SIZES.lg,
          },
        ]}
      >
        <TextStyled
          fontSize="md"
          fontWeight="regular"
          customColor="grayScale400"
        >
          Or
        </TextStyled>
      </View>

      <View
        style={[
          commonStyles.flexStyles.rowCenterWrap,
          {
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp5,
            marginVertical: APP_STYLE_VALUES.SPACE_SIZES.sp8,
          },
        ]}
      >
        <ImageIconCircle
          onPress={() => signInSocial("GOOGLE")}
          gradientBg={true}
          radius={APP_STYLE_VALUES.RADIUS_SIZES.lg}
          borderColor="primary"
          bgColor="appBackground"
          size={APP_STYLE_VALUES.WH_SIZES.lg}
          icon={<IconSocialGoogle />}
        />

        <ImageIconCircle
          onPress={() => signInSocial("FACEBOOK")}
          gradientBg={true}
          radius={APP_STYLE_VALUES.RADIUS_SIZES.lg}
          borderColor="primary"
          bgColor="appBackground"
          size={APP_STYLE_VALUES.WH_SIZES.lg}
          icon={<IconSocialFacebook />}
        />

        <ImageIconCircle
          onPress={() => signInSocial("APPLE")}
          gradientBg={true}
          radius={APP_STYLE_VALUES.RADIUS_SIZES.lg}
          borderColor="primary"
          bgColor="appBackground"
          size={APP_STYLE_VALUES.WH_SIZES.lg}
          icon={<IconSocialApple color={theme.grayScale900} />}
        />
      </View>

      <View
        style={[
          commonStyles.flexStyles.rowCenterWrap,
          { gap: APP_STYLE_VALUES.SPACE_SIZES.sp1 },
        ]}
      >
        <TextStyled
          fontSize="md"
          fontWeight="regular"
          customColor="grayScale400"
        >
          {authType === "REGISTER"
            ? "Already have an account?"
            : "Don't have an account yet?"}
        </TextStyled>

        <Link
          href={
            APP_ROUTES.PUBLIC.UNAUTHORIZED[
              authType === "REGISTER" ? "LOGIN" : "REGISTER"
            ]
          }
        >
          <TextStyled customColor="primary" fontSize="md" fontWeight="semibold">
            {authType === "REGISTER" ? "Login" : "Register"}
          </TextStyled>
        </Link>
      </View>
    </View>
  );
};

export default CardAlternativeAuth;
