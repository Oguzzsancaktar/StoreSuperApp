import { useEffect } from "react";

import { Stack } from "expo-router";

import APP_STORAGE_KEYS from "@/constants/APP_STORAGE_KEYS";
import { useModalState } from "@/contexts/ModalContext";
import { useStorageState } from "@/hooks/useStorageState";

export default function PublicLayout() {
  const { setModalContent } = useModalState();

  const [[isEulaAcceptedLoading, eulaAccepted]] = useStorageState(
    APP_STORAGE_KEYS.EULA_ACCEPTED,
  );

  useEffect(() => {
    // Only show EULA if it hasn't been accepted before and loading is complete
    if (!isEulaAcceptedLoading && !eulaAccepted) {
      setModalContent("ModalEula");
    }
  }, [isEulaAcceptedLoading, eulaAccepted]);

  return (
    <Stack>
      <Stack.Screen
        name="(unauthorized)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(drawer)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
