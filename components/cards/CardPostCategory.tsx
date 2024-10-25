import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import { View } from 'react-native';
import ImageIconCircle from '../images/ImageIconCircle';
import { TextStyled } from '../typography';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { ButtonStyled } from '../button';
import IconUser from '../svg/icon/IconUser';
import IconChatSupport from '../svg/icon/IconChatSupport';
import IconFAQ from '../svg/icon/IconFAQ';
import IconOptions from '../svg/icon/IconOptions';
import IconWorld from '../svg/icon/IconWorld';

const CardPostCategory = () => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();

  return (
    <View
      style={[
        themedStyles.cardStyles.default,
        commonStyles.flexStyles.colBetween,
        {
          paddingTop: APP_STYLE_VALUES.SPACE_SIZES.sp2,
          paddingVertical: APP_STYLE_VALUES.SPACE_SIZES.sp2,
        },
      ]}
    >
      <View
        style={[
          commonStyles.flexStyles.rowStart,
          {
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
          },
        ]}
      >
        <View style={{ width: APP_STYLE_VALUES.WH_SIZES.sm }}>
          <ImageIconCircle icon={<IconWorld />} />
        </View>

        <View style={commonStyles.flexStyles.colStart}>
          <TextStyled fontSize="h4" fontWeight="bold">
            Real Estate
          </TextStyled>
          <TextStyled
            fontSize="sm"
            fontWeight="medium"
            customColor="grayScale500"
          >
            Single Family Home
          </TextStyled>
        </View>
      </View>
    </View>
  );
};

export default CardPostCategory;
