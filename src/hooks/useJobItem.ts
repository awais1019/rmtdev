import { useEffect, useState } from "react";
import { JobItemDescription } from "../lib/types";
import { BASE_URL } from "../lib/constants";

type JobItemResponse = {
  jobItem: JobItemDescription;
};

export function useJobItem(id: number | null) {
  const [jobItem, setJobItem] = useState<JobItemDescription | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchItem = async () => {
      setIsLoading(true);
      const result = await fetch(`${BASE_URL}/${id}`);
      const data: JobItemResponse = await result.json();
      setIsLoading(false);
      setJobItem(data.jobItem);
    };
    fetchItem();
  }, [id]);

  return [jobItem, isLoading] as const;
}
