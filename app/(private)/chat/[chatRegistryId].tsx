import { ButtonGoBack, ButtonStyled } from '@/components/button';
import { InnerCommonContainer } from '@/components/containers';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import ImageIconCircle from '@/components/images/ImageIconCircle';
import ImageStyled from '@/components/images/ImageStyled';
import { InputStyled } from '@/components/input';
import ListFlatStyled from '@/components/list/ListFlatStyled';
import IconOptions from '@/components/svg/icon/IconOptions';
import IconSendMessage from '@/components/svg/icon/IconSendMessage';
import { TextStyled } from '@/components/typography';
import APP_ROUTES from '@/constants/APP_ROUTES';
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
import jwtUtils from '@/utils/jwtUtils';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, View } from 'react-native';

const MessagesDetailScreen = () => {
  const { session } = useSession();
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const { theme } = useAppTheme();
  const { chatRegistryId, listingId } = useLocalSearchParams();

  const userJwtDecoded = jwtUtils.userJwtDecode(session ?? '');

  const { data: messagesData } = useGetChatMessagesQuery(
    chatRegistryId as string
  );

  const [createMessage] = useCreateMessageMutation();
  const [newMessage, setNewMessage] = useState('');

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
            borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.lg,
            padding: APP_STYLE_VALUES.SPACE_SIZES.sp3,
            paddingVertical: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp1,
            minWidth: APP_STYLE_VALUES.WH_SIZES.xl3,
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
        <View>
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

  if (!session) {
    return <Redirect href={APP_ROUTES.PUBLIC.WELCOME} />;
  }

  if (!messagesData) {
    return null;
  }

  return (
    <ScreenWrapperContainer>
      <InnerCommonContainer>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? APP_STYLE_VALUES.SPACE_SIZES.sp13 : 0
          }
          style={{ flex: 1 }}
        >
          <View
            style={[
              commonStyles.flexStyles.rowBetween,
              { backgroundColor: theme.appBackground },
            ]}
          >
            <View
              style={[
                commonStyles.flexStyles.rowStart,
                { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
              ]}
            >
              <ButtonGoBack />
              <View
                style={[
                  commonStyles.flexStyles.rowStart,
                  { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
                ]}
              >
                <View
                  style={{
                    borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.full,
                    overflow: 'hidden',
                    width: APP_STYLE_VALUES.WH_SIZES.sm,
                    height: APP_STYLE_VALUES.WH_SIZES.sm,
                  }}
                >
                  <ImageStyled />
                </View>
                <View>
                  <TextStyled
                    fontSize="md"
                    fontWeight="semibold"
                    customColor="grayScale900"
                  >
                    Eyüp Ahmet
                  </TextStyled>
                </View>
              </View>
            </View>

            <IconOptions color={theme.grayScale900} />
          </View>

          <View
            style={[
              themedStyles.borderStyles.dashedPrimary,
              {
                maxWidth: APP_STYLE_VALUES.WH_SIZES.xl5,
                borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.lg,
                margin: APP_STYLE_VALUES.SPACE_SIZES.sp2,
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
                  Ev arabam
                </TextStyled>
                <TextStyled
                  textAlignment="left"
                  fontSize="xs"
                  fontWeight="medium"
                  customColor="grayScale500"
                  numberOfLines={1}
                >
                  Benim güzel arabam...
                </TextStyled>
              </View>
            </View>
          </View>

          <ListFlatStyled
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
              placeholder="Mesaj yazın..."
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
