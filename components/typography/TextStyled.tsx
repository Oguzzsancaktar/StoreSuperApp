import { useMemo } from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
import APP_TYPOGRAPHY from '@/constants/APP_TYPOGRAPHY';
import { IAppTheme, IShadowStylesheet } from '@/interfaces/theme';
import { useAppTheme } from '@/contexts/ThemeContext';
import { startsWith } from 'lodash';
import useThemedStyles from '@/hooks/useThemedStyles';

interface IProps {
  textAlignment?: 'left' | 'center' | 'right';
  textShadow?: keyof IShadowStylesheet;
  fontSize: keyof typeof APP_TYPOGRAPHY.fontSizes;
  fontWeight: keyof typeof APP_TYPOGRAPHY.fontWeights;
  customColor?: keyof IAppTheme;
  children: string | string[];
}

const TextStyled: React.FC<IProps> = ({
  textAlignment,
  textShadow,
  children,
  fontSize,
  fontWeight,
  customColor,
}) => {
  const { theme } = useAppTheme();
  const { shadowStyles } = useThemedStyles();

  const textStyles = useMemo(() => {
    const { fontSizes, fontWeights } = APP_TYPOGRAPHY;

    let tempStyles: StyleProp<TextStyle> = {
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
  }, [theme, textShadow, fontSize, fontWeight]);

  return <Text style={textStyles}>{children}</Text>;
};

export default TextStyled;
