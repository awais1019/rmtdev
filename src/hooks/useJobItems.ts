import { useEffect, useMemo, useState } from "react";
import { JobItem, JobResponse } from "../lib/types";

export function useJobItems(searchValue:string){
    const [jobList, setJobList] = useState<JobItem[]>([]);
      const [isLoading,setIsLoading]=useState(false)
      
      const slicedJobList=useMemo(()=>jobList.slice(0,7),[jobList])
    
      useEffect(() => {
        if (!searchValue) return;
        const fetchItems = async () => {
          setIsLoading(true)
          const result = await fetch(
            `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchValue}`
          );
          const data:JobResponse = await result.json();
          setIsLoading(false)
          setJobList(data.jobItems);
        };
        fetchItems();
      }, [searchValue]);

      return [
        slicedJobList,isLoading
      ] as const
    
}