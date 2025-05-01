import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { ProvideContext } from "../context/BookMarkItemIdProvider";

type Props = {
  id: number;
};
export default function BookmarkIcon({ id }: Props) {
  const { bookMarkIds, handleToogleBookMark } = ProvideContext();

  return (
    <button className="bookmark-btn" onClick={(e) =>  
    {
      handleToogleBookMark(id) 
      e.stopPropagation()
      e.preventDefault()

    }
    
    
    
    }>
      <BookmarkFilledIcon
        className={`
        ${bookMarkIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
