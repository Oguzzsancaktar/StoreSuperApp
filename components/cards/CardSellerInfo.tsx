import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import { View } from 'react-native';
import ImageIconCircle from '../images/ImageIconCircle';
import { TextStyled } from '../typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import IconUser from '../svg/icon/IconUser';
import IconChatSupport from '../svg/icon/IconChatSupport';
import IUser from '@/interfaces/account/IUser';
import moment from 'moment';
import APP_FORMATS from '@/constants/APP_FORMATS';
import { useAppTheme } from '@/contexts/ThemeContext';

interface IProps {
  user: IUser;
}
const CardSellerInfo: React.FC<IProps> = ({ user = {} as IUser }) => {
  const { theme } = useAppTheme();
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();

  return (
    <View style={themedStyles.cardStyles.default}>
      <View
        style={[
          commonStyles.flexStyles.rowStart,
          themedStyles.borderStyles.bottomUnderline,
          {
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            paddingBottom: APP_STYLE_VALUES.SPACE_SIZES.sp4,
          },
        ]}
      >
        <View style={{ width: APP_STYLE_VALUES.WH_SIZES.sm }}>
          <ImageIconCircle icon={<IconUser color={theme.grayScale900} />} />
        </View>

        <View style={commonStyles.flexStyles.colStart}>
          <TextStyled
            fontSize="h6"
            fontWeight="medium"
            customColor="grayScale400"
          >
            Seller
          </TextStyled>
          <TextStyled fontSize="h4" fontWeight="bold">
            {user?.firstName && user?.lastName
              ? user?.firstName + ' ' + user?.lastName
              : ''}
          </TextStyled>
          <TextStyled
            fontSize="sm"
            fontWeight="medium"
            customColor="grayScale500"
          >
            Member since,{' '}
            {moment(user.created).format(APP_FORMATS.DATE_NAME_MOMENT)}
          </TextStyled>
        </View>
      </View>

      <View
        style={[
          commonStyles.flexStyles.rowStart,
          {
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            paddingTop: APP_STYLE_VALUES.SPACE_SIZES.sp4,
          },
        ]}
      >
        <View
          style={[
            commonStyles.flexStyles.flexCenter,
            { width: APP_STYLE_VALUES.WH_SIZES.sm },
          ]}
        >
          <ImageIconCircle
            icon={<IconChatSupport color={theme.grayScale900} />}
          />
        </View>

        <View
          style={(commonStyles.flexStyles.colStart, { width: '100%', flex: 1 })}
        >
          <TextStyled
            fontSize="h6"
            fontWeight="medium"
            customColor="grayScale400"
            textAlignment="left"
          >
            Contact Information
          </TextStyled>
          <TextStyled fontSize="h4" fontWeight="bold" textAlignment="left">
            {user?.phoneNumber || user.email}
          </TextStyled>
        </View>
      </View>
    </View>
  );
};

export default CardSellerInfo;
