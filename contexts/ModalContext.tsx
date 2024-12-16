import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';

const ModalContext = createContext<{
  toggleModal: () => void;
  isModalOpen: boolean;
}>({
  toggleModal: () => null,
  isModalOpen: false,
});

export function useModalState() {
  const value = useContext(ModalContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useModal must be wrapped in a <ModalProvider />');
    }
  }

  return value;
}

export function ModalProvider({ children }: PropsWithChildren) {
  const [isModalOpen, setIsModalIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalIsOpen((prev) => !prev);
  };

  return (
    <ModalContext.Provider
      value={{
        toggleModal,
        isModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
