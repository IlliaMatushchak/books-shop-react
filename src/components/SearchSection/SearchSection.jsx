import "./SearchSection.css";
import PriceRangeInput from "../PriceRangeInput/PriceRangeInput";

function SearchSection({ filtersConfig, setFiltersConfig, sortType, setSortType }) {
  return (
    <section className="search-section flex fancy-background">
      <input
        className="search-by-name"
        type="search"
        name="searchByName"
        placeholder="Search by book name"
        aria-label="Search by book name"
        value={filtersConfig.searchValue}
        onChange={(e) => {
          setFiltersConfig((config) => ({ ...config, searchValue: e.target.value }));
        }}
      />

      <select
        title="Sort by"
        name="sortType"
        className="sort-selector"
        value={sortType}
        onChange={(e) => {
          setSortType(e.target.value);
        }}
      >
        <option value="" disabled>
          Sort by:
        </option>
        <option value="default">Default</option>
        <option value="name">Name</option>
        <option value="lowPrice">Lowest price</option>
        <option value="highPrice">Highest price</option>
      </select>

      <PriceRangeInput filtersConfig={filtersConfig} setFiltersConfig={setFiltersConfig} />
    </section>
  );
}

export default SearchSection;
