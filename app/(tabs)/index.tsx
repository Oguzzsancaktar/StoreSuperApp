import { Button, View } from 'react-native';
import { useAppTheme } from '@/contexts/ThemeContext';

import StyledText from '@/components/typography/StyledText';
import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';

export default function TabOneScreen() {
  const { theme, toggleTheme } = useAppTheme();

  return (
    <ScreenWrapperContainer>
      <StyledText fontWeight="bold" fontSize="h1">
        Tab One 1 Stled
      </StyledText>
      <StyledText fontWeight="medium" fontSize="xl">
        Tab One 1 Stled
      </StyledText>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </ScreenWrapperContainer>
  );
}
