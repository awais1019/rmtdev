import { useEffect, useState } from "react";
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
import { JobItem, JobResponse } from "../lib/types";




function App() {
  const [searchValue, setSearchValue] = useState("");
  const [jobList, setJobList] = useState<JobItem[]>([]);
  const [isLoading,setIsLoading]=useState(false)
  

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
            <ResultsCount />
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
