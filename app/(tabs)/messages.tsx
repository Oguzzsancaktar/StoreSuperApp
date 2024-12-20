import { Pressable, View } from "react-native";

import { router } from "expo-router";

import { InnerCommonContainer } from "@/components/containers";
import ScreenWrapperContainer from "@/components/containers/ScreenWrapperContainer";
import Preloader from "@/components/feedback/Preloader";
import Unauthorized from "@/components/feedback/Unauthorized";
import ImageIconCircle from "@/components/images/ImageIconCircle";
import ImageStyled from "@/components/images/ImageStyled";
import FlatListStyled from "@/components/override/FlatListStyled";
import IconBell from "@/components/svg/icon/IconBell";
import IconTrash from "@/components/svg/icon/IconTrash";
import { TextStyled } from "@/components/typography";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useAppAuthSession } from "@/contexts/AuthContext";
import useAppStyles from "@/hooks/useAppStyles";
import IChatConversation from "@/interfaces/chat/IChatConversation";
import { useGetChatListQuery } from "@/services/chatServices";

const MessagesScreen = () => {
  const { authToken } = useAppAuthSession();
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme, toggleTheme },
  } = useAppStyles();
  const { data: chatListData, isLoading: chatListIsLoading } =
    useGetChatListQuery();

  const renderItem = ({ item }: { item: IChatConversation }) => {
    const handleClick = () => {
      router.push({
        // @todo fix find best practice for constant all routes
        pathname: ("/(private)/chat/" + item.chatRegistryId) as any,
        params: { listingId: item.listingId },
      });
    };

    return (
      <Pressable
        onPress={handleClick}
        style={[
          commonStyles.flexStyles.rowStart,
          {
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            padding: APP_STYLE_VALUES.SPACE_SIZES.sp4,
            paddingVertical: APP_STYLE_VALUES.SPACE_SIZES.sp2,
          },
        ]}
      >
        <View
          style={{
            borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.full,
            width: APP_STYLE_VALUES.WH_SIZES.lg,
            height: APP_STYLE_VALUES.WH_SIZES.lg,
            overflow: "hidden",
          }}
        >
          <ImageStyled url={item.coverImage} />
        </View>
        <View style={[commonStyles.flexStyles.colStart, { flex: 1 }]}>
          <View style={[commonStyles.flexStyles.rowBetween]}>
            <View style={{ flex: 1 }}>
              <TextStyled
                textAlignment="left"
                fontSize="md"
                fontWeight="medium"
                customColor="grayScale900"
              >
                {item.name}
              </TextStyled>
            </View>
            <View
              style={{
                width: APP_STYLE_VALUES.WH_SIZES.xl4,
              }}
            >
              <TextStyled
                textAlignment="right"
                fontSize="md"
                fontWeight="regular"
                customColor="grayScale500"
              >
                {item.time}
              </TextStyled>
            </View>
          </View>
          <View style={[commonStyles.flexStyles.rowBetween, { width: "100%" }]}>
            <View>
              <TextStyled
                fontSize="md"
                fontWeight="regular"
                customColor="grayScale500"
                numberOfLines={1}
              >
                {item.lastMessage}
              </TextStyled>
            </View>
            {/* {2 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>{2}</Text>
              </View>
            )} */}
          </View>
        </View>
      </Pressable>
    );
  };

  if (!authToken) {
    return <Unauthorized showGoBack={false} isTabBarActive={true} />;
  }

  if (chatListIsLoading) {
    return <Preloader isTabBarActive={true} />;
  }

  return (
    <ScreenWrapperContainer>
      <InnerCommonContainer>
        <View
          style={[
            commonStyles.flexStyles.rowBetween,
            themedStyles.borderStyles.bottomUnderline,
            {
              padding: APP_STYLE_VALUES.SPACE_SIZES.sp4,
              paddingVertical: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            },
          ]}
        >
          <View>
            <TextStyled
              fontSize="lg"
              fontWeight="semibold"
              customColor="grayScale900"
              textAlignment="left"
            >
              Messages
            </TextStyled>
          </View>

          <View style={[commonStyles.flexStyles.rowStart]}>
            <ImageIconCircle
              bgColor="transparent"
              icon={<IconBell color={theme.grayScale900} />}
            />
            <ImageIconCircle
              bgColor="transparent"
              icon={<IconTrash color={theme.grayScale900} />}
            />
          </View>
        </View>

        <FlatListStyled
          showGradients={false}
          onStartShouldSetResponder={() => true}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: APP_STYLE_VALUES.SPACE_SIZES.sp13,
          }}
          data={chatListData}
        />
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default MessagesScreen;
