import useThemedStyles from '@/hooks/useThemedStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextStyled } from '../typography';
import useCommonStyles from '@/hooks/useCommonStyles';
import ImageCover from '../images/ImageCover';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { Href, router } from 'expo-router';
import IListingPost from '@/interfaces/listing/IListingPost';
import dateUtils from '@/utils/dateUtils';
import { find } from 'lodash';
import stringUtils from '@/utils/stringUtils';
import APP_ROUTES from '@/constants/APP_ROUTES';
import { useAppTheme } from '@/contexts/ThemeContext';
import IconLocation from '../svg/icon/IconLocation';

interface IProps {
  post: IListingPost;
}

const CardPostItem: React.FC<IProps> = ({ post }) => {
  const { theme } = useAppTheme();
  const themedStyles = useThemedStyles();
  const commonStyles = useCommonStyles();

  const handlePress = () => {
    router.push(('/(private)/post/' + post.id) as Href);
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
          {
            marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp2,
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp4,
          },
        ]}
      >
        <View style={{ width: 70, height: 70 }}>
          <ImageCover url={post?.media[0]?.url} />
        </View>

        <View style={[commonStyles.flexStyles.colStart, { flex: 1 }]}>
          <View
            style={[
              commonStyles.flexStyles.colStart,
              {
                flex: 1,
                marginBottom: APP_STYLE_VALUES.SPACE_SIZES.sp1,
              },
            ]}
          >
            <TextStyled
              fontSize="md"
              fontWeight="medium"
              textAlignment="left"
              customColor="grayScale900"
            >
              {post?.name}
            </TextStyled>
          </View>

          <View
            style={[
              commonStyles.flexStyles.rowWrap,
              { gap: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
            ]}
          >
            <View
              style={[
                commonStyles.flexStyles.colStart,
                themedStyles.cardStyles.medium,
                {
                  paddingVertical: APP_STYLE_VALUES.SPACE_SIZES.sp1,
                  width: 'auto',
                },
              ]}
            >
              <TextStyled
                fontSize="md"
                fontWeight="semibold"
                customColor="grayScale900"
              >
                Price
              </TextStyled>

              <TextStyled fontSize="sm" fontWeight="bold" customColor="primary">
                {post?.formattedPrice}
              </TextStyled>
            </View>

            <View
              style={[
                commonStyles.flexStyles.colStart,
                themedStyles.cardStyles.medium,
                {
                  paddingVertical: APP_STYLE_VALUES.SPACE_SIZES.sp1,
                  width: 'auto',
                },
              ]}
            >
              <TextStyled
                fontSize="md"
                fontWeight="semibold"
                customColor="grayScale900"
              >
                Surface
              </TextStyled>

              <TextStyled
                fontSize="sm"
                fontWeight="bold"
                customColor="grayScale600"
              >
                {find(post?.options, (option) => option.name === 'Surface')
                  ?.value || ''}
              </TextStyled>
            </View>
          </View>
        </View>
      </View>

      <View
        style={[
          commonStyles.flexStyles.rowStart,
          {
            width: '100%',
            gap: APP_STYLE_VALUES.SPACE_SIZES.sp1,
            alignItems: 'center',
          },
        ]}
      >
        <View style={{ width: APP_STYLE_VALUES.WH_SIZES.xxs }}>
          <IconLocation color={theme.grayScale400} />
        </View>

        <TextStyled
          fontSize="sm"
          fontWeight="regular"
          customColor={'grayScale400'}
          textAlignment="left"
        >
          {(post?.listingAddress?.countryName || '') +
            ', ' +
            (post?.listingAddress?.cityName + '')}
        </TextStyled>
      </View>

      <View
        style={[
          {
            margin: APP_STYLE_VALUES.SPACE_SIZES.sp3,
            height: 1,
            backgroundColor: theme.grayScale100,
          },
        ]}
      />

      <View
        style={[
          themedStyles.cardStyles.dark,
          { paddingVertical: APP_STYLE_VALUES.SPACE_SIZES.sp2 },
        ]}
      >
        <TextStyled fontSize="md" fontWeight="semibold" textAlignment="left">
          {stringUtils.truncateString(post?.description)}
        </TextStyled>
      </View>
    </TouchableOpacity>
  );
};

export default CardPostItem;
