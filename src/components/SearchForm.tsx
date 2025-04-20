

type Props={
  searchValue:string;
  onSetSearchValue:(value:string)=>void

}
export default function SearchForm({searchValue,onSetSearchValue}:Props) {

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
        onChange={(e) => onSetSearchValue(e.target.value)}
        value={searchValue}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
