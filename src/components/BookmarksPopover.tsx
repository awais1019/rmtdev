import { useBookMarkIdsContext } from "../context/BookMarkItemIdProvider";
import JobList from "./JobList";

export default function BookmarksPopover() {
  const { bookMarkedJobItems, isLoading } = useBookMarkIdsContext();

  return (
    <div className="bookmarks-popover">
      <JobList isLoading={isLoading} jobItems={bookMarkedJobItems} />
    </div>
  );
}
