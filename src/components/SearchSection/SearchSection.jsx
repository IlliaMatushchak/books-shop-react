import "./SearchSection.css";

function SearchSection({ filtersConfig, setFiltersConfig }) {
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
        title="Select price range"
        name="priceRange"
        className="price-range"
        value={filtersConfig.priceRange.join("-")}
        onChange={(e) => {
          const [min, max] = e.target.value.split("-").map(Number);
          setFiltersConfig((config) => ({ ...config, priceRange: [min, max] }));
        }}
      >
        <option value="0-9999">All prices</option>
        <option value="0-15">{"0$ < price < 15$"}</option>
        <option value="15-30">{"15$ < price < 30$"}</option>
        <option value="30-9999">{"price 30$ +"}</option>
      </select>
    </section>
  );
}

export default SearchSection;
