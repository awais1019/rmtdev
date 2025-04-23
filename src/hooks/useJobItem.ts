import { JobItemDescription } from "../lib/types";
import { BASE_URL } from "../lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

type JobItemResponse = {
  jobItem: JobItemDescription;
};

const fetchItem = async (
  id: number | null,
  signal: AbortSignal
): Promise<JobItemDescription> => {
  const result = await fetch(`${BASE_URL}/${id}`, { signal });
  if (!result.ok) {
    const response = await result.json();
    throw new Error(response?.description || "Failed to fetch item");
  }
  const data: JobItemResponse = await result.json();
  return data.jobItem;
};

export function useJobItem(id: number | null) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["job-item", id],
    queryFn: ({ signal }) => fetchItem(id, signal),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
  });
  useEffect(() => {
    if (isError && error) {
      toast.error((error as Error).message || "An unknown error occurred!");
    }
  }, [isError]);

  return { data, isLoading };
}

// export function useJobItem(id: number | null) {
//   const [jobItem, setJobItem] = useState<JobItemDescription | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!id) return;
//     const controller = new AbortController();
//     const signal = controller.signal;
//     const fetchItem = async () => {
//       setIsLoading(true);
//       const result = await fetch(`${BASE_URL}/${id}`, { signal });
//       const data: JobItemResponse = await result.json();
//       setIsLoading(false);
//       setJobItem(data.jobItem);
//     };
//     fetchItem();
//     return () => controller.abort();
//   }, [id]);

//   return [jobItem, isLoading] as const;
// }
