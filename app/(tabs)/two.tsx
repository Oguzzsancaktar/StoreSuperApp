import ScreenWrapperContainer from '@/components/containers/ScreenWrapperContainer';
import { useSession } from '@/contexts/AuthContext';
import { StyleSheet, Text, View } from 'react-native';

export default function TabTwoScreen() {
  const { signOut } = useSession();

  return (
    <ScreenWrapperContainer>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} />
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </Text>
    </ScreenWrapperContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
