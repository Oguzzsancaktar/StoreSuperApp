import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ListingFilterType {
  filterValues: any;
  setFilterValues: React.Dispatch<React.SetStateAction<any>>;
}

const ListingFilter = createContext<ListingFilterType | undefined>(undefined);

export const ListingFilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [filterValues, setFilterValues] = useState<any>({});

  return (
    <ListingFilter.Provider value={{ filterValues, setFilterValues }}>
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
