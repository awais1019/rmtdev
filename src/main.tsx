import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookMarkItemIdProvider from "./context/BookMarkItemIdProvider.tsx";
import SearchQueryProvider from "./context/SearchQueryProvider.tsx";
import JobItemsProvider from "./context/JobItemsProvider.tsx";
import ActiveIdProvider from "./context/ActiveIdProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ActiveIdProvider>
      <BookMarkItemIdProvider>
        <SearchQueryProvider>
          <JobItemsProvider>
            <App />
          </JobItemsProvider>
        </SearchQueryProvider>
      </BookMarkItemIdProvider>
      </ActiveIdProvider>
     
    </QueryClientProvider>
  </React.StrictMode>
);
