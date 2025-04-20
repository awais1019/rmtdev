import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";

import Spinner from "./Spinner";

type Props = {
  jobItems: JobItem[];
  isLoading:boolean;
};

export function JobList({ jobItems,isLoading }: Props) {

  return (<ul className="job-list">
      {isLoading && <Spinner/>}
   {!isLoading&&jobItems.map((job)=>(
    <JobListItem job={job}  key={job.id}/>
   ))}

  </ul>)
}

export default JobList;
