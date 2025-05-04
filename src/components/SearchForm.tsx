import { useSearchQueryContext } from "../context/SearchQueryProvider";


export default function SearchForm() {
  
  const {searchValue,handleSearchValue} =useSearchQueryContext()
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      action="#"
      className="search"
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        onChange={(e) => handleSearchValue(e.target.value)}
        value={searchValue}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
