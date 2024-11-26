import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';

const DrawerContext = createContext<{
  toggleDrawer: () => void;
  isDrawerOpen: boolean;
}>({
  toggleDrawer: () => null,
  isDrawerOpen: false,
});

export function useDrawerState() {
  const value = useContext(DrawerContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useDrawer must be wrapped in a <DrawerProvider />');
    }
  }

  return value;
}

export function DrawerProvider({ children }: PropsWithChildren) {
  const [isDrawerOpen, setIsDrawerIsOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsDrawerIsOpen((prev) => !prev);
  };

  return (
    <DrawerContext.Provider
      value={{
        toggleDrawer,
        isDrawerOpen,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}
