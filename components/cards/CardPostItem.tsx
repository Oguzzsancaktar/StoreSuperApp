import useThemedStyles from '@/hooks/useThemedStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextStyled } from '../typography';
import useCommonStyles from '@/hooks/useCommonStyles';
import ImageCover from '../images/ImageCover';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { router } from 'expo-router';
import moment from 'moment';
import IListingPost from '@/interfaces/listing/IListingPost';
import APP_FORMATS from '@/constants/APP_FORMATS';
import dateUtils from '@/utils/dateUtils';
import { find } from 'lodash';
import stringUtils from '@/utils/stringUtils';

interface IProps {
  post: IListingPost;
}

const CardPostItem: React.FC<IProps> = ({ post }) => {
  const themedStyles = useThemedStyles();
  const commonStyles = useCommonStyles();

  console.log('111post', post);
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
          {dateUtils.formatDateForMoment(
            post?.created ?? '',
            'DATE_NAME_MOMENT'
          )}
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
          {post?.tags[0]}
        </TextStyled>
      </View>

      <View
        style={[
          commonStyles.flexStyles.rowWrap,
          { marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
        ]}
      >
        <View style={{ width: 100, height: 100 }}>
          <ImageCover url={post?.media[0]?.url} />
        </View>

        <View style={[commonStyles.flexStyles.colStart, { flex: 1 }]}>
          <View
            style={[
              commonStyles.flexStyles.colStart,
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
              {post?.name}
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
                {post?.formattedPrice}
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
                {find(post?.options, (option) => option.name === 'Surface')
                  ?.value || ''}
              </TextStyled>
            </View>
          </View>
        </View>
      </View>

      <TextStyled fontSize="md" fontWeight="semibold" textAlignment="left">
        {stringUtils.truncateString(post?.description)}
      </TextStyled>
    </TouchableOpacity>
  );
};

export default CardPostItem;
