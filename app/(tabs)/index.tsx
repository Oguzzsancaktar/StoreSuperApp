import { Button, View } from 'react-native';
import { useAppTheme } from '@/contexts/ThemeContext';

import TextStyled from '@/components/typography/TextStyled';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';

export default function TabOneScreen() {
  const { theme, toggleTheme } = useAppTheme();

  return (
    <ScreenWrapperContainer>
      <TextStyled fontWeight="bold" fontSize="h1">
        Tab One 1 Stled
      </TextStyled>
      <TextStyled fontWeight="medium" fontSize="xl">
        Tab One 1 Stled
      </TextStyled>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </ScreenWrapperContainer>
  );
}
