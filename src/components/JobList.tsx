import { useActiveItemId } from "../hooks/useActiveItemId";
import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";

import Spinner from "./Spinner";

type Props = {
  jobItems: JobItem[];
  isLoading:boolean;
};

export function JobList({ jobItems,isLoading }: Props) {
  const activeId=useActiveItemId()

  return (<ul className="job-list">
      {isLoading && <Spinner/>}
   {!isLoading&&jobItems.map((job)=>(
    <JobListItem job={job}  key={job.id} isActive={
      job.id===activeId
    }/>
   ))}

  </ul>)
}

export default JobList;
