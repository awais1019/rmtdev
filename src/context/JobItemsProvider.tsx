import React, { createContext, useContext, useMemo, useState } from "react";
import { useSearchQuery } from "../hooks/useSearchQuery";
import { JobItem, PageDirection, SortBy } from "../lib/types";
import { RESULT_PER_PAGE } from "../lib/constants";
import { useSearchQueryContext } from "./SearchQueryProvider";

type JobItemsProviderProps = {
  jobList: JobItem[] | undefined;
  isLoading: boolean;
  sortBy: SortBy;
  sortedandSlicedJobList: JobItem[];
  totalNumOfResults: number;
  totalNumOfPages: number;
  currentPage:number;
  handlePageChange: (direction: PageDirection) => void;
  handleSortBy: (sortby: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsProviderProps | null>(
  null
);

export default function JobItemsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { debouncedValue } = useSearchQueryContext();
  const { data: jobList, isLoading } = useSearchQuery(debouncedValue);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  const sortedJobLists = useMemo(() => {
    const list = [...(jobList || [])];
    return list.sort((a, b) =>
      sortBy === "relevant"
        ? (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0)
        : (a.daysAgo ?? 0) - (b.daysAgo ?? 0)
    );
  }, [jobList, sortBy]);

  const sortedandSlicedJobList = useMemo(
    () =>
      sortedJobLists.slice(
        currentPage * RESULT_PER_PAGE - RESULT_PER_PAGE,
        currentPage * RESULT_PER_PAGE
      ) || [],
    [currentPage, sortedJobLists]
  );
  const totalNumOfResults = jobList?.length || 0;
  const totalNumOfPages = totalNumOfResults / RESULT_PER_PAGE;

  const handlePageChange = (direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSortBy = (sortby: SortBy) => {
    setSortBy(sortby);
    setCurrentPage(1);
  };

  return (
    <JobItemsContext.Provider
      value={{
        jobList,
        isLoading,
        currentPage,
        sortBy,
        handlePageChange,
        handleSortBy,
        totalNumOfPages,
        totalNumOfResults,
        sortedandSlicedJobList,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
}
export function useJobItemsContext() {
  const context = useContext(JobItemsContext);

  if (!context) {
    throw new Error(
      "JobItemsContext is undefined. Wrap your component with JobItemsProvider."
    );
  }
  return context;
}