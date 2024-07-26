import { Button, StyleSheet, Text, View } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { useAppTheme } from '@/contexts/ThemeContext';
import useThemedStyles from '@/hooks/useThemedStyles';

export default function TabOneScreen() {
  const { toggleTheme } = useAppTheme();
  const styles = useThemedStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tab One 1</Text>
      <View style={styles.container} />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}
