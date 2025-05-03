import { useQueries } from "@tanstack/react-query";
import { fetchItem } from "./useJobItem";
import { JobItemDescription } from "../lib/types";

export default function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["bookmarked-items", id],
      queryFn: ({ signal }: { signal: AbortSignal }) => fetchItem(id, signal),
      enabled: Boolean(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
    })),
  });
  const bookMarkedJobItems: JobItemDescription[] = results
    .map((job) => job.data)
    .filter((item): item is JobItemDescription => item !== undefined);
  const isLoading = results.some((job) => job.isLoading);
  return {
    bookMarkedJobItems,
    isLoading,
  };
}
