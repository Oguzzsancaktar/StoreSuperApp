import { Button, View } from 'react-native';
import { useAppTheme } from '@/contexts/ThemeContext';
import useThemedStyles from '@/hooks/useThemedStyles';
import StyledText from '@/components/typography/StyledText';

export default function TabOneScreen() {
  const { toggleTheme } = useAppTheme();
  const styles = useThemedStyles();

  return (
    <View style={styles.container}>
      <StyledText fontWeight="bold" fontSize="h1">
        Tab One 1 Stled
      </StyledText>
      <StyledText fontWeight="medium" fontSize="xl">
        Tab One 1 Stled
      </StyledText>
      <View style={styles.container} />
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}
