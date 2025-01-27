import { useEffect, useMemo, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { ButtonStyled } from "@/components/button";
import { InnerCommonContainer } from "@/components/containers";
import ScreenWrapperContainer from "@/components/containers/ScreenWrapperContainer";
import EmptyState from "@/components/feedback/EmptyState";
import Preloader from "@/components/feedback/Preloader";
import ImageIconCircle from "@/components/images/ImageIconCircle";
import ImageStyled from "@/components/images/ImageStyled";
import ImageUserProfile from "@/components/images/ImageUserProfile";
import { InputStyled } from "@/components/input";
import ModalRemoveChat from "@/components/modal/ModalRemoveChat";
import FlatListStyled from "@/components/override/FlatListStyled";
import IconOptions from "@/components/svg/icon/IconOptions";
import IconSendMessage from "@/components/svg/icon/IconSendMessage";
import IconTrash from "@/components/svg/icon/IconTrash";
import { TextStyled } from "@/components/typography";
import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STYLE_VALUES from "@/constants/APP_STYLE_VALUES";
import { useAppAuthSession } from "@/contexts/AuthContext";
import useAppStyles from "@/hooks/useAppStyles";
import IChatCreateDTO from "@/interfaces/chat/IChatCreateDTO";
import IChatMessage from "@/interfaces/chat/IChatMessage";
import { useGetUserProfileQuery } from "@/services/accountServices";
import {
  useCreateMessageMutation,
  useGetChatMessagesQuery,
  useLazyGetChatMessagesQuery,
} from "@/services/chatServices";
import { useGetListingItemDetailsQuery } from "@/services/listingServices";
import routerUtils from "@/utils/routerUtils";

const MessagesDetailScreen = () => {
  const { userTokenInfo } = useAppAuthSession();
  const {
    commonStyles,
    themedStyles,
    themeContext: { theme, toggleTheme },
  } = useAppStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { chatRegistryId, listingId } = useLocalSearchParams();

  const { data: listingDetailData, isLoading: listingDetailIsLoading } =
    useGetListingItemDetailsQuery(listingId as string, { skip: !listingId });

  const [fetchMessages, { data: messagesData, isLoading: messagesIsLoading }] =
    useLazyGetChatMessagesQuery();

  const opponentId = useMemo(() => {
    let tempId = userTokenInfo?.Id;
    if (messagesData && messagesData.length) {
      const message = messagesData[0];
      tempId =
        userTokenInfo?.Id === message?.receiverId
          ? message?.senderId
          : message?.receiverId;
    } else {
      tempId = listingDetailData?.user?.id;
    }
    return tempId;
  }, [messagesData, userTokenInfo]);

  const { data: opponentProfiledata, isLoading: opponentProfileIsLoading } =
    useGetUserProfileQuery(opponentId || "", {
      skip: !opponentId,
    });

  const [createMessage] = useCreateMessageMutation();
  const [newMessage, setNewMessage] = useState("");

  const handleAdvertClick = () => {
    router.push({
      pathname: routerUtils.buildRoute(APP_ROUTES.PUBLIC.DRAWER.POST.LISTING, {
        listingId: listingId as string,
      }),
    });
  };

  const sendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const tempMessage: IChatCreateDTO = {
          listingId: (listingId as string) || "",
          message: newMessage,
        };
        const messageCreateResult = await createMessage(tempMessage).unwrap();

        if (chatRegistryId === "new") {
          router.replace(APP_ROUTES.TABS.CONVERSATIONS);
        }
      } catch (error) {
        console.log("eeee", error);
      }
      setNewMessage("");
      Keyboard.dismiss();
    }
  };

  const handleChatRemoveClick = () => {
    setIsModalOpen(() => true);
  };

  const renderMessage = ({ item }: { item: IChatMessage }) => (
    <View
      onStartShouldSetResponder={() => true}
      style={{
        marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp2,
      }}
    >
      <View
        style={[
          themedStyles.borderStyles.default,
          {
            maxWidth: "100%",
            borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.lg,
            padding: APP_STYLE_VALUES.SPACE_SIZES.sp3,
            paddingVertical: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp1,
            minWidth: APP_STYLE_VALUES.WH_SIZES.xl6,
          },
          item.senderId === userTokenInfo?.Id
            ? {
                borderColor: theme.primary,
                backgroundColor: theme.primaryOpacity10,
                borderBottomRightRadius: 0,
                alignSelf: "flex-end",
              }
            : {
                borderBottomLeftRadius: 0,
                alignSelf: "flex-start",
              },
        ]}
      >
        <View style={{ height: "auto", maxWidth: "100%" }}>
          <TextStyled
            textAlignment="left"
            fontSize="md"
            fontWeight="regular"
            customColor="grayScale900"
          >
            {item.message}
          </TextStyled>
        </View>
      </View>

      <View
        style={[
          { marginHorizontal: APP_STYLE_VALUES.SPACE_SIZES.sp1 },
          item.senderId === userTokenInfo?.Id
            ? {
                alignSelf: "flex-end",
              }
            : {
                alignSelf: "flex-start",
              },
        ]}
      >
        <View>
          <TextStyled
            textAlignment="left"
            fontSize="xs"
            fontWeight="regular"
            customColor="grayScale600"
          >
            {item.time}
          </TextStyled>
        </View>
      </View>
    </View>
  );

  useEffect(() => {
    fetchMessages(chatRegistryId as string);
  }, [chatRegistryId, fetchMessages]);

  if (listingDetailIsLoading || messagesIsLoading || opponentProfileIsLoading) {
    return <Preloader />;
  }

  if (!messagesData || !listingDetailData) {
    return <EmptyState />;
  }

  return (
    <ScreenWrapperContainer
      showGoBack={true}
      leftElement={
        <ImageUserProfile
          height={APP_STYLE_VALUES.WH_SIZES.sm}
          width={APP_STYLE_VALUES.WH_SIZES.sm}
          url={opponentProfiledata?.image}
        />
      }
      headerTitle={
        opponentProfiledata?.lastName && opponentProfiledata?.firstName
          ? (opponentProfiledata?.firstName || "") +
            " " +
            (opponentProfiledata?.lastName || "")
          : opponentProfiledata?.email
      }
      rightElement={
        <ButtonStyled variant="transparent" onPress={handleChatRemoveClick}>
          <IconTrash color={theme.grayScale900} />
        </ButtonStyled>
      }
    >
      <ModalRemoveChat
        chatRegistryId={chatRegistryId as string}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      <InnerCommonContainer>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={
            Platform.OS === "ios" ? APP_STYLE_VALUES.SPACE_SIZES.sp30 : 0
          }
          style={{ flex: 1 }}
        >
          <Pressable
            onPress={handleAdvertClick}
            style={[
              themedStyles.borderStyles.dashedPrimary,
              {
                minWidth: APP_STYLE_VALUES.WH_SIZES.xl5,
                borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.lg,
                marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp2,
                marginHorizontal: "auto",
                padding: APP_STYLE_VALUES.SPACE_SIZES.sp3,
              },
            ]}
          >
            <View
              style={[
                commonStyles.flexStyles.rowCenter,

                {
                  gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
                },
              ]}
            >
              <ImageStyled
                url={listingDetailData.media[0]?.url}
                width={APP_STYLE_VALUES.WH_SIZES.xs}
                height={APP_STYLE_VALUES.WH_SIZES.xs}
              />
              <View style={[commonStyles.flexStyles.colStart]}>
                <TextStyled
                  textAlignment="left"
                  fontSize="sm"
                  fontWeight="medium"
                  customColor="grayScale900"
                  numberOfLines={1}
                >
                  {listingDetailData.name}
                </TextStyled>
                <TextStyled
                  textAlignment="left"
                  fontSize="xs"
                  fontWeight="medium"
                  customColor="grayScale500"
                  numberOfLines={1}
                >
                  {listingDetailData.formattedPrice}
                </TextStyled>
              </View>
            </View>
          </Pressable>

          <FlatListStyled
            showGradients={false}
            allowEmpty={true}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flexGrow: 1,
            }}
            data={messagesData}
            renderItem={renderMessage}
          />

          <View
            style={[
              commonStyles.flexStyles.rowBetween,
              {
                gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
              },
            ]}
          >
            <InputStyled
              name="sendMessageInput"
              type="text"
              style={[
                themedStyles.inputStyles.default,
                { flex: 1, backgroundColor: "transparent" },
              ]}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Enter your message..."
            />

            <ImageIconCircle
              gradientBg={true}
              radius={APP_STYLE_VALUES.RADIUS_SIZES.lg}
              borderColor="primary"
              bgColor="primary"
              icon={<IconSendMessage color={theme.white} />}
              size={APP_STYLE_VALUES.WH_SIZES.lg}
              onPress={sendMessage}
            />
          </View>
        </KeyboardAvoidingView>
      </InnerCommonContainer>
    </ScreenWrapperContainer>
  );
};

export default MessagesDetailScreen;
