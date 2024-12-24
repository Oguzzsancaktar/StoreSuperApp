import { View } from "react-native";

import { Href, router } from "expo-router";

import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useAppTheme } from "@/contexts/ThemeContext";
import IListingPost from "@/interfaces/listing/IListingPost";
import ISelectOption from "@/interfaces/theme/ISelectOption";
import { useDeleteListingMutation } from "@/services/listingServices";
import routerUtils from "@/utils/routerUtils";
import { toastSuccess } from "@/utils/toastUtils";

import ImageIconCircle from "../images/ImageIconCircle";
import InputSelectStyled from "../input/InputSelectStyled";
import IconOptions from "../svg/icon/IconOptions";

const data = [
  { label: "Visit Profile", value: "profile" },
  { label: "Delete Listing", value: "delete" },
  // { label: 'Edit Listing', value: 'edit' },
];

interface IProps {
  post: IListingPost;
}
const ButtonListingActionDropdown: React.FC<IProps> = ({ post }) => {
  const { theme } = useAppTheme();
  const [deleteListing] = useDeleteListingMutation();

  const handleSelect = async (item: ISelectOption) => {
    switch (item.value) {
      case "profile":
        router.push(
          routerUtils.buildRoute(APP_ROUTES.PUBLIC.DRAWER.PROFILE, {
            profileId: post?.user?.id,
          }) as Href,
        );
        break;
      case "delete":
        await deleteListing(post.id);
        toastSuccess("Listing deleted successfully.");
        break;
      case "edit":
        alert("Paylaş");
        break;

      default:
        break;
    }
  };

  // @todo padding need to be dynamic define variant

  return (
    <View style={{ width: APP_STYLE_VALUES.WH_SIZES.md }}>
      <InputSelectStyled
        renderRightIcon={() => (
          <ImageIconCircle
            bgColor="transparent"
            size={APP_STYLE_VALUES.WH_SIZES.xs}
            icon={
              <IconOptions
                width={APP_STYLE_VALUES.WH_SIZES.xs2}
                height={APP_STYLE_VALUES.WH_SIZES.xs2}
                color={theme.grayScale500}
              />
            }
          />
        )}
        containerStyle={{ width: APP_STYLE_VALUES.WH_SIZES.xl6 }}
        options={data}
        handleSelect={handleSelect}
        variant="transparent"
      />
    </View>
  );
};
export default ButtonListingActionDropdown;
