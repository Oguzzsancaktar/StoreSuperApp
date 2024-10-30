import useThemedStyles from '@/hooks/useThemedStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextStyled } from '../typography';
import useCommonStyles from '@/hooks/useCommonStyles';
import ImageCover from '../images/ImageCover';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { router } from 'expo-router';
import { COMMON_COLOURS } from '@/constants/APP_THEMES';

const CardPostItem = () => {
  const themedStyles = useThemedStyles();
  const commonStyles = useCommonStyles();

  const handlePress = () => {
    router.push('/(private)/post/x');
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={themedStyles.cardStyles.default}
    >
      <View
        style={[
          commonStyles.absolutePositionStyles.absoluteFill,
          themedStyles.buttonStyles.badgePrimarySolid,
          {
            width: 140,
            left: 'auto',
            borderRadius: 0,
            borderBottomLeftRadius: APP_STYLE_VALUES.RADIUS_SIZES.sm,
          },
        ]}
      >
        <TextStyled fontSize="md" fontWeight="semibold" customColor="white">
          12 Jun 2023
        </TextStyled>
      </View>

      <View
        style={[
          commonStyles.absolutePositionStyles.absoluteFill,
          themedStyles.buttonStyles.badgeGrayscale600Solid,

          {
            width: 140,
            left: 'auto',
            top: 'auto',
            borderRadius: 0,
            borderTopLeftRadius: APP_STYLE_VALUES.RADIUS_SIZES.sm,
          },
        ]}
      >
        <TextStyled
          fontSize="md"
          fontWeight="semibold"
          customColor="grayScale100"
        >
          Apartment
        </TextStyled>
      </View>

      <View
        style={[
          commonStyles.flexStyles.rowWrap,
          { marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
        ]}
      >
        <View style={{ width: 100, height: 100 }}>
          <ImageCover />
        </View>

        <View style={[commonStyles.flexStyles.colStart, { flex: 1 }]}>
          <View
            style={[
              commonStyles.flexStyles.rowWrap,
              {
                flex: 1,
                paddingLeft: APP_STYLE_VALUES.SPACE_SIZES.sp2,
                marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp4,
              },
            ]}
          >
            <TextStyled
              fontSize="md"
              fontWeight="semibold"
              textAlignment="left"
            >
              Perfect Land House
            </TextStyled>

            <TextStyled fontSize="sm" fontWeight="regular" textAlignment="left">
              Centar Župa Municipality, North Macedonia
            </TextStyled>
          </View>

          <View style={commonStyles.flexStyles.rowWrap}>
            <View style={(commonStyles.flexStyles.rowWrap, { flex: 1 })}>
              <TextStyled fontSize="md" fontWeight="semibold">
                Price
              </TextStyled>

              <TextStyled fontSize="sm" fontWeight="bold" customColor="primary">
                1.190,00€
              </TextStyled>
            </View>

            <View style={(commonStyles.flexStyles.rowWrap, { flex: 1 })}>
              <TextStyled fontSize="md" fontWeight="semibold">
                Surface
              </TextStyled>

              <TextStyled
                fontSize="sm"
                fontWeight="bold"
                customColor="grayScale900"
              >
                119
              </TextStyled>
            </View>
          </View>
        </View>
      </View>

      <TextStyled fontSize="md" fontWeight="semibold" textAlignment="left">
        Description
      </TextStyled>
    </TouchableOpacity>
  );
};

export default CardPostItem;
