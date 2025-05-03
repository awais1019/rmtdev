import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { JobItemDescription } from "../lib/types";
import useJobItems from "../hooks/useJobItems";

type BookMarkContextProps = {
  bookMarkIds: number[];
  handleToogleBookMark: (id: number) => void;
  bookMarkedJobItems: JobItemDescription[];
  isLoading: boolean;
};
export const BookMarkContext = createContext<BookMarkContextProps | null>(null);

export default function BookMarkItemIdProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [bookMarkIds, setBookMarkedIds] = useLocalStorage<number[]>(
    "BookmarkIds",
    []
  );
  const { bookMarkedJobItems, isLoading } = useJobItems(bookMarkIds);

  const handleToogleBookMark = (id: number) => {
    if (bookMarkIds.includes(id)) {
      setBookMarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookMarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookMarkContext.Provider
      value={{
        bookMarkIds,
        handleToogleBookMark,
        bookMarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookMarkContext.Provider>
  );
}
export function useBookMarkIdsContext() {
  const context = useContext(BookMarkContext);

  if (!context) {
    throw new Error(
      "BookMarkContext is undefined. Wrap your component with BookMarkProvider."
    );
  }
  return context;
}
