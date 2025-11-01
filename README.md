# RMTDEV

A React + TypeScript project for exploring remote job listings.  
Users can search, sort, view details, and bookmark jobs for later — all client-side.

## ✨ Features

- 🔍 Search for remote jobs with debounced input
- 📄 View job details on click
- 📌 Bookmark jobs (stored in localStorage)
- 🕒 Sort by recent or relevant
- 📑 Client-side pagination
- ⚡ Real-time updates using React Query
- 🧩 Modular logic using Context and Custom Hooks

## 🧠 Tech Stack

- **React** (with **TypeScript**) – UI and component logic
- **Plain CSS** – styling
- **React Query** – data fetching, caching, and async state
- **React Context API** – global state management
- **Custom Hooks** – reusable logic for debounce, local storage, data fetching
- **LocalStorage API** – for bookmark persistence

## 🧱 Project Structure

```
src/
│
├── components/
│   ├── Background.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Container.tsx
│   ├── SortingControls.tsx
│   ├── PaginationControls.tsx
│   ├── JobList.tsx
│   ├── JobListWrapper.tsx
│   ├── JobDetails.tsx
│   └── ...other UI components
│
├── context/
│   ├── ActiveIdProvider.tsx
│   ├── BookMarkItemIdsProvider.tsx
│   ├── SearchQueryProvider.tsx
│   └── JobItemsProvider.tsx
│
├── hooks/
│   ├── useActiveId.ts
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   ├── useJobItem.ts
│   ├── useJobItems.ts
│   ├── useSearchQuery.ts
│
│
├── lib/
│   ├── constants.ts
│   └── types.ts
│
└── App.tsx
```

## 🧩 Main Contexts

| Context                     | Description                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------- |
| **ActiveIdProvider**        | Manages and provides the currently selected job ID (for detail view and highlighting). |
| **BookMarkItemIdsProvider** | Stores and shares bookmarked job IDs using localStorage.                               |
| **SearchQueryProvider**     | Keeps track of the user’s current search input (debounced).                            |
| **JobItemsProvider**        | Central provider combining search, sorted,paginated, and fetched job data.             |

## ⚙️ Custom Hooks Overview

| Hook                | Purpose                                                        |
| ------------------- | -------------------------------------------------------------- |
| **useDebounce**     | Adds delay before triggering search requests.                  |
| **useActiveId**     | Reads job ID from the URL hash and updates on hash change.     |
| **useJobItems**     | Fetches job list data base on stored jobsId using React Query. |
| **useJobItem**      | Fetches single job details by ID.                              |
| **useLocalStorage** | Stores and retrieves bookmark IDs from localStorage.           |
| **useSearchQuery**  | Returns job results based on current search input.             |

---

## 🧭 Application Flow

1. **Search**

   - User types into the search bar.
   - `useDebounce` delays updates.
   - The debounced query is stored in `SearchQueryProvider`.
   - `JobItemsProvider` uses `useSearchQuery` to fetch jobs.

2. **View Job Details**

   - User clicks a job item.
   - The job ID is added to the URL hash (`#job-id`).
   - `useActiveId` detects hash change and updates context.
   - `useJobItem` fetches details for the current ID.

3. **Bookmark Jobs**

   - Bookmarks are managed via `useLocalStorage`.
   - `BookMarkItemIdsProvider` provides bookmarked IDs globally.
   - Bookmarked job data is fetched using `useJobItems`.

4. **Pagination & Sorting**
   - Client-side pagination and sorting handled by dedicated components.



## 🧰 Installation

```bash
# Clone the repository
git clone https://github.com/awais1019/rmtdev.git

# Navigate into project folder
cd rmtdev

# Install dependencies
npm install

# Start the development server
npm run dev

```

## 🧩 Learning Focus

This project was built for learning and practicing **React and TypeScript** concepts, including:

- Using **React Query** for efficient data fetching and caching
- Designing reusable **custom hooks** for cleaner logic
- Managing global state with **React Context API**
- Handling client-side data persistence using **localStorage**
- Implementing **debounced search, sorting, and pagination**
- Structuring a **modular and scalable React architecture**
- Strengthening understanding of **React with TypeScript**

## 🧩 License

This project was created **as part of a React course** for learning purposes.  
All CSS styling was provided by the instructor.  
You are free to use, modify, and experiment with it.
