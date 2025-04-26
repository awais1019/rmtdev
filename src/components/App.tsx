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

function App() {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 300);
  const { data: jobList, isLoading } = useJobItems(debouncedValue);
  const [currentPage, setCurrentPage ] = useState(1);

  const slicedJobList = useMemo(() => jobList?.slice(currentPage*7-7,currentPage*7)||[],[currentPage,jobList])
  const totalNumOfResults = jobList?.length || 0;
  const totalNumOfPages=totalNumOfResults/7;

  const handlePageChange = (direction: "previous" | "next") => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
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
            <SortingControls />
          </SidebarTop>
          <JobList jobItems={slicedJobList} isLoading={isLoading} />
          <PaginationControls currentPage={currentPage} handlePageChange={handlePageChange} totalNumOfPages={totalNumOfPages} />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
