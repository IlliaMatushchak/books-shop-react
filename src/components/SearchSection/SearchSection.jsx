import "./SearchSection.css";

function SearchSection({
  filterValues: { searchValue, setSearchValue, priceRange, setPriceRange },
}) {
  return (
    <section className="search-section flex fancy-background">
      <input
        className="search-by-name"
        type="search"
        name="searchByName"
        placeholder="Search by book name"
        aria-label="Search by book name"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />

      <select
        title="Select price range"
        name="priceRange"
        className="price-range"
        value={priceRange}
        onChange={(e) => {
          setPriceRange(e.target.value);
        }}
      >
        <option value="[0, 9999]">All prices</option>
        <option value="[0, 15]">{"0$ < price < 15$"}</option>
        <option value="[15, 30]">{"15$ < price < 30$"}</option>
        <option value="[30, 9999]">{"price 30$ +"}</option>
      </select>
    </section>
  );
}

export default SearchSection;
