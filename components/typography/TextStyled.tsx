import { useMemo } from 'react';
import { Text, StyleProp, TextStyle, View } from 'react-native';
import APP_TYPOGRAPHY from '@/constants/APP_TYPOGRAPHY';
import { IAppTheme, IShadowStylesheet } from '@/interfaces/theme';
import { useAppTheme } from '@/contexts/ThemeContext';
import { startsWith } from 'lodash';
import useThemedStyles from '@/hooks/useThemedStyles';
import useCommonStyles from '@/hooks/useCommonStyles';

interface IProps {
  textAlignment?: 'left' | 'center' | 'right';
  textShadow?: keyof IShadowStylesheet;
  fontSize: keyof typeof APP_TYPOGRAPHY.fontSizes;
  fontWeight: keyof typeof APP_TYPOGRAPHY.fontWeights;
  customColor?: keyof IAppTheme;
  children: string | string[] | number;
  numberOfLines?: number;
  textTransform?: TextStyle['textTransform'];
}

const TextStyled: React.FC<IProps> = ({
  textTransform = 'none',
  textAlignment,
  textShadow,
  children,
  fontSize,
  fontWeight,
  customColor,
  numberOfLines,
}) => {
  const { theme } = useAppTheme();
  const { shadowStyles } = useThemedStyles();
  const commonStyles = useCommonStyles();

  const textStyles = useMemo(() => {
    const { fontSizes, fontWeights } = APP_TYPOGRAPHY;

    let tempStyles: StyleProp<TextStyle> = {
      textTransform: textTransform,
      width: '100%',
      lineHeight: fontSizes[fontSize] * 1.5,
      textAlign: textAlignment || 'center',
      fontSize: fontSizes[fontSize],
      fontFamily: fontWeights[fontWeight],
      color: customColor
        ? theme[customColor]
        : startsWith(fontSize, 'h')
        ? theme.grayScale900
        : theme.grayScale600,
    };

    if (textShadow) {
      tempStyles = {
        ...tempStyles,
        ...shadowStyles[textShadow],
      };
    }

    return tempStyles;
  }, [
    theme,
    customColor,
    textShadow,
    fontSize,
    fontWeight,
    textTransform,
    textAlignment,
  ]);

  return (
    <View style={[commonStyles.flexStyles.colCenter, { width: '100%' }]}>
      <Text numberOfLines={numberOfLines} style={textStyles}>
        {children}
      </Text>
    </View>
  );
};

export default TextStyled;
