import { useEffect, useState } from "react";

import { Redirect, Stack } from "expo-router";

import APP_ROUTES from "@/constants/APP_ROUTES";
import APP_STORAGE_KEYS from "@/constants/APP_STORAGE_KEYS";
import { useAppAuthSession } from "@/contexts/AuthContext";
import { useModalState } from "@/contexts/ModalContext";
import { useStorageState } from "@/hooks/useStorageState";

export default function PublicLayout() {
  const { authToken } = useAppAuthSession();

  const { setModalContent } = useModalState();

  // const [[isEulaAcceptedLoading, eulaAccepted], setEulaAccepted] =
  //   useStorageState(APP_STORAGE_KEYS.EULA_ACCEPTED);

  // const checkEulaStatus = async () => {
  //   if (!eulaAccepted) {
  //     setModalContent("ModalEula");
  //   } else {
  //     setModalContent(null);
  //   }
  // };

  // useEffect(() => {
  //   checkEulaStatus();
  // }, [eulaAccepted]);

  if (authToken) {
    return <Redirect href={APP_ROUTES.TABS.TIMELINE} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="welcome"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
