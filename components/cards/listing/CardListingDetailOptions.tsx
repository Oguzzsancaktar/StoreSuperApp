import { View, Text } from 'react-native';
import React from 'react';
import IListingPost from '@/interfaces/listing/IListingPost';
import useCommonStyles from '@/hooks/useCommonStyles';
import useThemedStyles from '@/hooks/useThemedStyles';
import { TextStyled } from '@/components/typography';
import { map } from 'lodash';
import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import ImageIconCircle from '@/components/images/ImageIconCircle';
import IconFAQ from '@/components/svg/icon/IconFAQ';
import IconTechnical from '@/components/svg/icon/IconTechnical';
import { useAppTheme } from '@/contexts/ThemeContext';

interface IProps {
  options: IListingPost['options'];
}
const CardListingDetailOptions: React.FC<IProps> = ({ options }) => {
  const commonStyles = useCommonStyles();
  const themedStyles = useThemedStyles();
  const { theme } = useAppTheme();
  return (
    <View
      style={[
        themedStyles.cardStyles.default,
        {
          gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
          width: '100%',
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
          <ImageIconCircle
            icon={<IconTechnical color={theme.grayScale900} />}
          />
        </View>

        <View style={commonStyles.flexStyles.colStart}>
          <TextStyled fontSize="h4" fontWeight="bold">
            Features
          </TextStyled>
        </View>
      </View>
      {map(options, (feature, index) => {
        return (
          <View
            style={[
              feature?.values?.length
                ? commonStyles.flexStyles.colCenter
                : commonStyles.flexStyles.rowBetween,
              {
                gap: APP_STYLE_VALUES.SPACE_SIZES.sp2,
              },
            ]}
            key={index}
          >
            <View style={{ flex: 1, width: '100%' }}>
              <TextStyled
                fontSize="h6"
                textAlignment="left"
                fontWeight="semibold"
              >
                {feature.name}:
              </TextStyled>
            </View>

            {feature?.values?.length ? (
              map(feature?.values, (f, j) => {
                return (
                  <View
                    style={[
                      commonStyles.flexStyles.flexCenter,
                      themedStyles.buttonStyles.badgeOutlined,
                      { width: '100%' },
                    ]}
                    key={j}
                  >
                    <TextStyled fontSize="md" fontWeight="regular">
                      {f.name}
                    </TextStyled>
                  </View>
                );
              })
            ) : (
              <View style={[]}>
                <TextStyled fontSize="md" fontWeight="regular">
                  {feature?.value}
                </TextStyled>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default CardListingDetailOptions;
