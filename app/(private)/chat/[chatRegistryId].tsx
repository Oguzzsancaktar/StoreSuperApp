import { InnerCommonContainer } from '@/components/containers';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import EmptyState from '@/components/feedback/EmptyState';
import Preloader from '@/components/feedback/Preloader';
import ImageIconCircle from '@/components/images/ImageIconCircle';
import ImageStyled from '@/components/images/ImageStyled';
import ImageUserProfile from '@/components/images/ImageUserProfile';
import { InputStyled } from '@/components/input';
import FlatListStyled from '@/components/override/FlatListStyled';
import IconOptions from '@/components/svg/icon/IconOptions';
import IconSendMessage from '@/components/svg/icon/IconSendMessage';
import { TextStyled } from '@/components/typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { useSession } from '@/contexts/AuthContext';
import { useAppTheme } from '@/contexts/ThemeContext';
import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import IChatCreateDTO from '@/interfaces/chat/IChatCreateDTO';
import IChatMessage from '@/interfaces/chat/IChatMessage';
import {
  useCreateMessageMutation,
  useGetChatMessagesQuery,
} from '@/services/chatServices';
import { useGetListingItemDetailsQuery } from '@/services/listingServices';
import jwtUtils from '@/utils/jwtUtils';
import { Href, Redirect, router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from 'react-native';

const MessagesDetailScreen = () => {
  const { session } = useSession();
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const { theme } = useAppTheme();
  const { chatRegistryId, listingId } = useLocalSearchParams();

  const { data: listingDetailData, isLoading: listingDetailIsLoading } =
    useGetListingItemDetailsQuery(listingId as string, { skip: !listingId });

  const userJwtDecoded = jwtUtils.userJwtDecode(session ?? '');

  const { data: messagesData, isLoading: messagesIsLoading } =
    useGetChatMessagesQuery(chatRegistryId as string);

  const [createMessage] = useCreateMessageMutation();
  const [newMessage, setNewMessage] = useState('');

  const handleAdvertClick = () => {
    router.push(('/(drawer)/post/' + listingId) as Href);
  };

  const sendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const tempMessage: IChatCreateDTO = {
          listingId: (listingId as string) || '',
          message: newMessage,
        };
        const messageCreateResult = createMessage(tempMessage).unwrap();
      } catch (error) {
        console.log('eeee', error);
      }
      setNewMessage('');
      Keyboard.dismiss();
    }
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
            maxWidth: '100%',
            borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.lg,
            padding: APP_STYLE_VALUES.SPACE_SIZES.sp3,
            paddingVertical: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp1,
            minWidth: APP_STYLE_VALUES.WH_SIZES.xl6,
          },
          item.senderId === userJwtDecoded.Id
            ? {
                borderColor: theme.primary,
                backgroundColor: theme.primaryOpacity10,
                borderBottomRightRadius: 0,
                alignSelf: 'flex-end',
              }
            : {
                borderBottomLeftRadius: 0,
                alignSelf: 'flex-start',
              },
        ]}
      >
        <View style={{ height: 'auto', maxWidth: '100%' }}>
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
          item.senderId === userJwtDecoded.Id
            ? {
                alignSelf: 'flex-end',
              }
            : {
                alignSelf: 'flex-start',
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

  if (listingDetailIsLoading || messagesIsLoading) {
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
          url={listingDetailData?.user?.image}
        />
      }
      headerTitle={
        listingDetailData.user?.lastName && listingDetailData.user?.firstName
          ? (listingDetailData.user?.firstName || '') +
            ' ' +
            (listingDetailData.user?.lastName || '')
          : listingDetailData.user.email
      }
      rightElement={<IconOptions color={theme.grayScale900} />}
    >
      <InnerCommonContainer>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? APP_STYLE_VALUES.SPACE_SIZES.sp30 : 0
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
                marginHorizontal: 'auto',
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
                { flex: 1, backgroundColor: 'transparent' },
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
