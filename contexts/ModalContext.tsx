import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

import { MODAL_CONTENTS } from "@/components/modal/ModalGlobal";

const ModalContext = createContext<{
  setModalContent: React.Dispatch<
    React.SetStateAction<keyof typeof MODAL_CONTENTS | null>
  >;
  modalContent: keyof typeof MODAL_CONTENTS | null;
}>({
  setModalContent: () => null,
  modalContent: null,
});

export function useModalState() {
  const value = useContext(ModalContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useModal must be wrapped in a <ModalProvider />");
    }
  }

  return value;
}

export function ModalProvider({ children }: PropsWithChildren) {
  const [modalContent, setModalContent] = useState<
    keyof typeof MODAL_CONTENTS | null
  >(null);

  return (
    <ModalContext.Provider
      value={{
        setModalContent,
        modalContent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
