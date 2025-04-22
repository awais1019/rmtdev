import { useState } from "react";
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






function App() {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue=useDebounce(searchValue,300)
  const [jobList,isLoading,totalNumberofResults]=useJobItems(debouncedValue)

  
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
            <ResultsCount totalNumberofResults={totalNumberofResults}  />
            <SortingControls />
          </SidebarTop>
          <JobList jobItems={jobList} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
