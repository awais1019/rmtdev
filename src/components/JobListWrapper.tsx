import JobList from "./JobList";
import { useJobItemsContext } from "../context/JobItemsProvider";

export default function JobListWrapper() {
  const { sortedandSlicedJobList:jobList, isLoading } = useJobItemsContext();
  return <JobList jobItems={jobList} isLoading={isLoading} />;
}
