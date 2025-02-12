import { useCallback, useEffect } from "react";
import { Pressable, View } from "react-native";
import { useDispatch } from "react-redux";

import { router, useFocusEffect } from "expo-router";

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
import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useAppAuthSession } from "@/contexts/AuthContext";
import useAppStyles from "@/hooks/useAppStyles";
import IChatConversation from "@/interfaces/chat/IChatConversation";
import {
  CHAT_API_TAG,
  chatApiSlice,
  useGetChatListQuery,
  useLazyGetChatListQuery,
} from "@/services/chatServices";
import routerUtils from "@/utils/routerUtils";

const ConversationsScreen = () => {
  const { authToken } = useAppAuthSession();
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme },
  } = useAppStyles();
  const dispatch = useDispatch();

  const [
    fetchMessages,
    { data: chatListData, isLoading: chatListIsLoading, isFetching, status },
  ] = useLazyGetChatListQuery();

  const renderItem = ({ item }: { item: IChatConversation }) => {
    const handleConversationClick = () => {
      router.push({
        pathname: routerUtils.buildRoute(
          APP_ROUTES.PRIVATE.CHAT.CHAT_REGISTRY,
          {
            chatRegistryId: item.chatRegistryId,
          },
        ),
        params: { listingId: item.listingId },
      });
    };

    return (
      <Pressable
        onPress={handleConversationClick}
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

  useFocusEffect(
    useCallback(() => {
      fetchMessages(); // Tab her aktif olduğunda veriyi yeniden fetch et.
    }, [fetchMessages]),
  );

  if (!authToken) {
    return <Unauthorized showGoBack={false} isTabBarActive={true} />;
  }

  if (chatListIsLoading || isFetching) {
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

          {/* <View style={[commonStyles.flexStyles.rowStart]}>
            <ImageIconCircle
              bgColor="transparent"
              icon={<IconBell color={theme.grayScale900} />}
            />
            <ImageIconCircle
              bgColor="transparent"
              icon={<IconTrash color={theme.grayScale900} />}
            />
          </View> */}
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

export default ConversationsScreen;
