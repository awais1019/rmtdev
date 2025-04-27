import { useMemo, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import SearchForm from "./SearchForm";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import PaginationControls from "./PaginationControls";
import JobList from "./JobList";
import SortingControls from "./SortingControls";
import ResultsCount from "./ResultsCount";
import { useJobItems } from "../hooks/useJobItems";
import useDebounce from "../hooks/useDebounce";
import { Toaster } from "react-hot-toast";
import { PageDirection, SortBy } from "../lib/types";
import { RESULT_PER_PAGE } from "../lib/constants";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 400);
  const { data: jobList, isLoading } = useJobItems(debouncedValue);
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
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm
          searchValue={searchValue}
          onSetSearchValue={setSearchValue}
        />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberofResults={totalNumOfResults} />
            <SortingControls onClick={handleSortBy} sortBy={sortBy} />
          </SidebarTop>
          <JobList jobItems={sortedandSlicedJobList} isLoading={isLoading} />
          <PaginationControls
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalNumOfPages={totalNumOfPages}
          />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
