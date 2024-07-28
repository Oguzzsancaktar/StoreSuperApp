import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import APP_TYPOGRAPHY from '@/constants/APP_TYPOGRAPHY';
import { IAppTheme } from '@/interfaces/theme';
import { useAppTheme } from '@/contexts/ThemeContext';
import { startsWith } from 'lodash';

interface IProps {
  fontSize: keyof typeof APP_TYPOGRAPHY.fontSizes;
  fontWeight: keyof typeof APP_TYPOGRAPHY.fontWeights;
  customColor?: keyof IAppTheme;
  children: string;
}

const StyledText: React.FC<IProps> = ({
  children,
  fontSize,
  fontWeight,
  customColor,
}) => {
  const { theme } = useAppTheme();

  const textStyles = useMemo(() => {
    const { fontSizes, fontWeights } = APP_TYPOGRAPHY;
    const tempStyles = {
      color: customColor
        ? theme[customColor]
        : startsWith(fontSize, 'h')
        ? theme.grayScale900
        : theme.grayScale600,
      fontSize: fontSizes[fontSize],
      fontFamily: fontWeights[fontWeight],
    };
    return tempStyles;
  }, [theme, fontSize, fontWeight]);

  return (
    <View>
      <Text style={textStyles}>{children}</Text>
    </View>
  );
};

export default StyledText;
