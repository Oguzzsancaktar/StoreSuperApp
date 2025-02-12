import { TouchableOpacity, View } from "react-native";

import { Href, router } from "expo-router";

import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import useAppStyles from "@/hooks/useAppStyles";
import IListingPost from "@/interfaces/listing/IListingPost";
import { useGetViewCountQuery } from "@/services/listingServices";
import dateUtils from "@/utils/dateUtils";
import routerUtils from "@/utils/routerUtils";
import stringUtils from "@/utils/stringUtils";

import ImageStyled from "../images/ImageStyled";
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
    router.push(
      routerUtils.buildRoute(APP_ROUTES.PUBLIC.DRAWER.POST.LISTING, {
        listingId: post.id,
      }),
    );
  };

  return (
    <View style={[themedStyles.cardStyles.default]}>
      <View
        style={[
          commonStyles.absolutePositionStyles.absoluteFill,
          themedStyles.buttonStyles.badgePrimarySolid,
          {
            width: APP_STYLE_VALUES.WH_SIZES.xl6,
            left: "auto",
            borderRadius: 0,
            borderBottomLeftRadius: APP_STYLE_VALUES.RADIUS_SIZES.sm,
          },
        ]}
      >
        <TextStyled fontSize="md" fontWeight="semibold" customColor="white">
          {dateUtils.formatDateForMoment(
            post?.created ?? "",
            "DATE_MOMENT_MONTH_NAME",
          )}
        </TextStyled>
      </View>

      <View
        style={[
          commonStyles.absolutePositionStyles.absoluteFill,
          themedStyles.buttonStyles.badgeGrayscale600Solid,
          {
            width: 140,
            right: "auto",
            bottom: "auto",
            borderRadius: 0,
            borderBottomRightRadius: APP_STYLE_VALUES.RADIUS_SIZES.sm,
          },
        ]}
      >
        <View>
          <TextStyled
            fontSize="md"
            fontWeight="semibold"
            customColor="grayScale100"
            textAlignment="left"
          >
            {post?.category?.name || post?.tags[0]}
          </TextStyled>
        </View>
      </View>

      <TouchableOpacity style={{}} onPress={handlePress}>
        <View
          style={[
            commonStyles.flexStyles.rowWrap,
            {
              marginTop: APP_STYLE_VALUES.SPACE_SIZES.sp2,
              marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp2,
              gap: APP_STYLE_VALUES.SPACE_SIZES.sp4,
            },
          ]}
        >
          <View
            style={{
              width: APP_STYLE_VALUES.WH_SIZES.xl,
              height: APP_STYLE_VALUES.WH_SIZES.xl,
            }}
          >
            <ImageStyled url={post?.media[0]?.url} />
          </View>

          <View style={[commonStyles.flexStyles.colStart, { flex: 1 }]}>
            <View
              style={[
                commonStyles.flexStyles.colStart,
                {
                  flex: 1,
                  marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp1,
                },
              ]}
            >
              <TextStyled
                textTransform="capitalize"
                fontSize="md"
                fontWeight="medium"
                textAlignment="left"
                customColor="grayScale900"
              >
                {post?.name}
              </TextStyled>
            </View>

            <View
              style={[
                commonStyles.flexStyles.rowWrap,
                { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
              ]}
            >
              <View
                style={[
                  commonStyles.flexStyles.colStart,
                  themedStyles.cardStyles.medium,
                  {
                    paddingVertical: APP_STYLE_VALUES.SPACE_SIZES.sp1,
                    width: "auto",
                  },
                ]}
              >
                <TextStyled
                  fontSize="md"
                  fontWeight="semibold"
                  customColor="grayScale900"
                >
                  Price
                </TextStyled>

                <TextStyled
                  fontSize="sm"
                  fontWeight="bold"
                  customColor="primary"
                >
                  {post?.formattedPrice}
                </TextStyled>
              </View>

              {/* <View
                style={[
                  commonStyles.flexStyles.colStart,
                  themedStyles.cardStyles.medium,
                  {
                    paddingVertical: APP_STYLE_VALUES.SPACE_SIZES.sp1,
                    width: 'auto',
                  },
                ]}
              >
                <TextStyled
                  fontSize="md"
                  fontWeight="semibold"
                  customColor="grayScale900"
                >
                  Surface
                </TextStyled>

                <TextStyled
                  fontSize="sm"
                  fontWeight="bold"
                  customColor="grayScale600"
                >
                  {find(post?.options, (option) => option.name === 'Surface')
                    ?.value || ''}
                </TextStyled>
              </View> */}
            </View>
          </View>
        </View>

        <View
          style={[
            commonStyles.flexStyles.rowStart,
            {
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
          >
            {post?.listingAddress &&
              (post?.listingAddress?.countryName || "") +
                ", " +
                (post?.listingAddress?.cityName + "")}
          </TextStyled>
        </View>

        <View
          style={[
            {
              margin: APP_STYLE_VALUES.SPACE_SIZES.sp3,
              height: 1,
              backgroundColor: theme.grayScale100,
            },
          ]}
        />

        <View
          style={[
            themedStyles.cardStyles.dark,
            { paddingVertical: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
          ]}
        >
          <TextStyled fontSize="md" fontWeight="semibold" textAlignment="left">
            {stringUtils.truncateString(post?.description)}
          </TextStyled>
        </View>
      </TouchableOpacity>

      <View
        style={[
          commonStyles.flexStyles.rowBetween,
          {
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            marginTop: APP_STYLE_VALUES.SPACE_SIZES.sp4,
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
