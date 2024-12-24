import { TouchableOpacity } from "react-native";

import { router, useNavigation } from "expo-router";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useAppTheme } from "@/contexts/ThemeContext";

import ImageIconCircle from "../images/ImageIconCircle";
import IconChevronLeft from "../svg/icon/IconChevronLeft";

interface IProps {
  customEvent?: () => void;
  isCircular?: boolean;
}

const ButtonGoBack: React.FC<IProps> = ({ customEvent, isCircular = true }) => {
  const { theme } = useAppTheme();
  const navigation = useNavigation();

  const handlePress = () => {
    if (customEvent) {
      customEvent();
    } else {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        router.back();
      }
    }
  };

  if (!router.canGoBack()) {
    return;
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        {
          zIndex: 99,
          top: 0,
        },
      ]}
    >
      {isCircular ? (
        <ImageIconCircle
          bgColor="transparent"
          icon={
            <IconChevronLeft
              width={APP_STYLE_VALUES.WH_SIZES.xs}
              height={APP_STYLE_VALUES.WH_SIZES.xs}
              color={theme.grayScale900}
            />
          }
        />
      ) : (
        <IconChevronLeft
          width={APP_STYLE_VALUES.WH_SIZES.xs}
          height={APP_STYLE_VALUES.WH_SIZES.xs}
          color={theme.grayScale900}
        />
      )}
    </TouchableOpacity>
  );
};

export default ButtonGoBack;
