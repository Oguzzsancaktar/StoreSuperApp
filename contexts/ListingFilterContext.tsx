import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import APP_THEMES from '@/constants/APP_THEMES';
import { IAppTheme } from '@/interfaces/theme';
import APP_STORAGE_KEYS from '@/constants/APP_STORAGE_KEYS';
import { useStorageState } from '@/hooks/useStorageState';
import IListingCategory from '@/interfaces/listing/IListingCategory';

interface ListingFilterType {
  selectedCategory: IListingCategory['id'] | undefined;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ListingFilter = createContext<ListingFilterType | undefined>(undefined);

export const ListingFilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    IListingCategory['id'] | undefined
  >(undefined);

  return (
    <ListingFilter.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </ListingFilter.Provider>
  );
};

export const useListingFilter = (): ListingFilterType => {
  const context = useContext(ListingFilter);
  if (context === undefined) {
    throw new Error(
      'useListingFilter must be used within a ListingFilterProvider'
    );
  }
  return context;
};
