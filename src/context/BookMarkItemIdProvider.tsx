import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type BookMarkContextProps = {
  bookMarkIds: number[];
  handleToogleBookMark: (id: number) => void;
};
export const BookMarkContext = createContext<BookMarkContextProps | null>(null);

export default function BookMarkItemIdProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [bookMarkIds, setBookMarkedIds] = useLocalStorage<number[]>("BookmarkIds",[]);

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
      }}
    >
      {children}
    </BookMarkContext.Provider>
  );
}
export function ProvideContext(){
  const context = useContext(BookMarkContext);
  
    if (!context) {
      throw new Error("BookMarkContext is undefined. Wrap your component with BookMarkProvider.");
    }
    return context;
}