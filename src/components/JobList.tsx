import { useActiveIdContext } from "../context/ActiveIdProvider";

import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";

import Spinner from "./Spinner";

type Props = {
  jobItems: JobItem[] | undefined;
  isLoading:boolean;
};

export function JobList({ jobItems,isLoading }: Props) {
  const {activeId}=useActiveIdContext()

  return (<ul className="job-list">
      {isLoading && <Spinner/>}
   {!isLoading&&jobItems?.map((job)=>(
    <JobListItem job={job}  key={job.id} isActive={
      job.id===activeId
    }/>
   ))}

  </ul>)
}

export default JobList;
