import { TouchableOpacity, View } from "react-native";

import { Href, router } from "expo-router";

import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";
import IListingPost from "@/interfaces/listing/IListingPost";
import { useGetViewCountQuery } from "@/services/listingServices";
import dateUtils from "@/utils/dateUtils";
import stringUtils from "@/utils/stringUtils";

import { ButtonStyled } from "../button";
import ImageStyled from "../images/ImageStyled";
import IconCalendar from "../svg/icon/IconCalendar";
import IconLocation from "../svg/icon/IconLocation";
import IconEyeShowFilled from "../svg/icon/filled/IconEyeShowFilled";
import IconHeartFilled from "../svg/icon/filled/IconHeartFilled";
import { TextStyled } from "../typography";
import CardListingActions from "./CardListingActions";

interface IProps {
  post: IListingPost;
}

const CardPostItem: React.FC<IProps> = ({ post }) => {
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme },
  } = useAppStyles();

  const { data: postViewData } = useGetViewCountQuery(post.id);

  const handlePress = () => {
    // @todo create structure for dynamic route to APP_ROUTES
    router.push(("/(drawer)/post/" + post.id) as Href);
  };

  return (
    <View style={[themedStyles.cardStyles.default]}>
      <TouchableOpacity
        style={{ gap: APP_STYLE_VALUES.SPACE_SIZES.sp3 }}
        onPress={handlePress}
      >
        <View
          style={[
            commonStyles.flexStyles.rowStart,
            {
              gap: APP_STYLE_VALUES.SPACE_SIZES.sp4,
            },
          ]}
        >
          <View
            style={{
              width: APP_STYLE_VALUES.WH_SIZES.xl5,
              height: APP_STYLE_VALUES.WH_SIZES.xl5,
            }}
          >
            <ImageStyled url={post?.media[0]?.url} />
          </View>

          <View
            style={[
              commonStyles.flexStyles.colBetween,
              { height: APP_STYLE_VALUES.WH_SIZES.xl5, flex: 1 },
            ]}
          >
            <View style={{ width: APP_STYLE_VALUES.WH_SIZES.xl4 }}>
              <ButtonStyled variant="badgePrimaryOutlined">
                <TextStyled
                  textTransform="capitalize"
                  fontSize="sm"
                  fontWeight="regular"
                  customColor="primary"
                >
                  {post?.categories?.shift()?.name ||
                    post?.category?.name ||
                    post?.tags[0]}
                </TextStyled>
              </ButtonStyled>
            </View>

            <TextStyled
              textTransform="capitalize"
              fontSize="h6"
              fontWeight="bold"
              textAlignment="left"
              customColor="grayScale900"
              numberOfLines={1}
            >
              {post?.name}
            </TextStyled>

            <View
              style={[
                commonStyles.flexStyles.rowBetween,
                themedStyles.cardStyles.medium,
                {
                  height: APP_STYLE_VALUES.WH_SIZES.md,
                  paddingVertical: APP_STYLE_VALUES.SPACE_SIZES.sp1,
                },
              ]}
            >
              <TextStyled
                customStyle={{ width: APP_STYLE_VALUES.WH_SIZES.md }}
                textAlignment="left"
                fontSize="sm"
                fontWeight="semibold"
                customColor="grayScale900"
              >
                Price
              </TextStyled>
              <TextStyled
                customStyle={{ flex: 1 }}
                textAlignment="right"
                fontSize="lg"
                fontWeight="bold"
                customColor="primary"
              >
                {post?.formattedPrice}
              </TextStyled>
            </View>
          </View>
        </View>

        <View
          style={[
            commonStyles.flexStyles.rowBetween,
            { gap: APP_STYLE_VALUES.SPACE_SIZES.sp7 },
          ]}
        >
          <View
            style={[
              commonStyles.flexStyles.rowStart,
              {
                flex: 1,
                width: "100%",
                gap: APP_STYLE_VALUES.SPACE_SIZES.sp1,
                alignItems: "center",
              },
            ]}
          >
            <View style={{ width: APP_STYLE_VALUES.WH_SIZES.xs2 }}>
              <IconLocation color={theme.grayScale500} />
            </View>
            <TextStyled
              fontSize="sm"
              fontWeight="regular"
              customColor={"grayScale500"}
              textAlignment="left"
              numberOfLines={1}
            >
              {post?.listingAddress &&
                post?.listingAddress?.countryName +
                  " " +
                  post?.listingAddress?.cityName}
            </TextStyled>
          </View>

          <View
            style={[
              commonStyles.flexStyles.rowStart,
              {
                width: APP_STYLE_VALUES.WH_SIZES.xl5,
                gap: APP_STYLE_VALUES.SPACE_SIZES.sp1,
                alignItems: "center",
              },
            ]}
          >
            <View style={{ width: APP_STYLE_VALUES.WH_SIZES.xs2 }}>
              <IconCalendar color={theme.grayScale500} />
            </View>
            <TextStyled
              fontSize="sm"
              fontWeight="regular"
              customColor={"grayScale500"}
              textAlignment="left"
              numberOfLines={1}
            >
              {dateUtils.formatDateForMoment(
                post?.created ?? "",
                "DATE_MOMENT_MONTH_NAME",
              )}
            </TextStyled>
          </View>
        </View>

        <TextStyled
          customStyle={[
            themedStyles.cardStyles.dark,
            { paddingVertical: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
          ]}
          numberOfLines={3}
          fontSize="md"
          fontWeight="medium"
          textAlignment="left"
        >
          {stringUtils.truncateString(post?.description)}
        </TextStyled>
      </TouchableOpacity>

      <View
        style={[
          commonStyles.flexStyles.rowBetween,
          {
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            marginBottom: -APP_STYLE_VALUES.SPACE_SIZES.sp4,
          },
        ]}
      >
        <View
          style={[
            commonStyles.flexStyles.rowStart,
            { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
          ]}
        >
          <View
            style={[
              commonStyles.flexStyles.rowStart,
              { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
            ]}
          >
            <IconEyeShowFilled color={theme.grayScale400} />
            {/* @todo remove view */}
            <View>
              <TextStyled
                fontSize="md"
                fontWeight="medium"
                customColor="grayScale900"
              >
                {postViewData || ""}
              </TextStyled>
            </View>
          </View>
          <View
            style={[
              commonStyles.flexStyles.rowStart,
              { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
            ]}
          >
            <IconHeartFilled
              width={APP_STYLE_VALUES.WH_SIZES.xs3}
              height={APP_STYLE_VALUES.WH_SIZES.xs3}
              color={theme.grayScale400}
            />
            <View>
              <TextStyled
                fontSize="md"
                fontWeight="medium"
                customColor="grayScale900"
              >
                {post.favoriteCount}
              </TextStyled>
            </View>
          </View>
        </View>

        <CardListingActions post={post} />
      </View>
    </View>
  );
};

export default CardPostItem;
