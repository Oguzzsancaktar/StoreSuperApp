import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Link, Stack, router } from "expo-router";
import { Redirect } from "expo-router";

import APP_ROUTES from "@/constants/APP_ROUTES";

export default function NotFoundScreen() {
  return <Redirect href={APP_ROUTES.PUBLIC.UNAUTHORIZED.WELCOME} />;
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>

        <Link href="/(tabs)/timeline" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
