import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import { View } from 'react-native';
import ImageIconCircle from '../images/ImageIconCircle';
import { TextStyled } from '../typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { ButtonStyled } from '../button';
import IconUser from '../svg/icon/IconUser';
import IconChatSupport from '../svg/icon/IconChatSupport';

const CardSellerInfo = () => {
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
          <ImageIconCircle icon={<IconUser />} />
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
            Seller Name
          </TextStyled>
          <TextStyled
            fontSize="sm"
            fontWeight="medium"
            customColor="grayScale500"
          >
            Member since, 20.02.2024
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
          <ImageIconCircle icon={<IconChatSupport />} />
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
            +90 (543) 334 44 55
          </TextStyled>

          <View
            style={{
              gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
              marginTop: APP_STYLE_VALUES.SPACE_SIZES.sp4,
            }}
          >
            <ButtonStyled
              text="Visit Profile"
              variant="buttonPrimaryOutlined"
            />
            <ButtonStyled text="Message" variant="buttonPrimarySolid" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardSellerInfo;
