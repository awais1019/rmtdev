import { useEffect } from "react";
import { JobItem, JobResponse } from "../lib/types";
import { BASE_URL } from "../lib/constants";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const fetchItems = async (
  searchValue: string,
  signal: AbortSignal
): Promise<JobItem[]> => {
  const result = await fetch(`${BASE_URL}?search=${searchValue}`,{signal});
  if(!result.ok)
  {
    const response= await result.json();
    throw new Error(response?.description || "Failed to fetch item");
  }
  const data: JobResponse = await result.json();
  return data.jobItems;
};

export function useSearchQuery(searchValue: string) {
 
  const {data,isError,error,isLoading}=useQuery({
    queryKey:['job-items',searchValue],
    queryFn:({signal})=>fetchItems(searchValue,signal),
    enabled:Boolean(searchValue),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
  })
  useEffect(() => {
    if (isError && error) {
      toast.error((error as Error).message || "An unknown error occurred!");
    }
  }, [isError]);



  return {data, isLoading} as const;
}

// export function useJobItems(searchValue:string){
//     const [jobList, setJobList] = useState<JobItem[]>([]);
//       const [isLoading,setIsLoading]=useState(false)

//       useEffect(() => {
//         if (!searchValue) return;
//         const fetchItems = async () => {
//           setIsLoading(true)
//           const result = await fetch(
//             `${BASE_URL}?search=${searchValue}`
//           );
//           const data:JobResponse = await result.json();
//           setIsLoading(false)
//           setJobList(data.jobItems);
//         };
//         fetchItems();
//       }, [searchValue]);

//       return [
//         jobList,isLoading
//       ] as const

// }
