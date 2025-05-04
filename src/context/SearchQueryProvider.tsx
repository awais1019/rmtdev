import { createContext, ReactNode, useContext, useState } from "react";
import useDebounce from "../hooks/useDebounce";

type SearchQueryProviderProps = {
  searchValue: string;
  debouncedValue: string;
  handleSearchValue: (value: string) => void;
};
export const SearchQueryContext =
  createContext<SearchQueryProviderProps | null>(null);

export default function SearchQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 400);

  const handleSearchValue = (value: string) => {
    setSearchValue(value);
  };
  return (
    <SearchQueryContext.Provider
      value={{
        searchValue,
        debouncedValue,
        handleSearchValue,
      }}
    >
      {children}
    </SearchQueryContext.Provider>
  );
}
export function useSearchQueryContext() {
  const context = useContext(SearchQueryContext);

  if (!context) {
    throw new Error(
      "SearchQueryContext is undefined. Wrap your component with SearchQueryProvider."
    );
  }
  return context;
}
