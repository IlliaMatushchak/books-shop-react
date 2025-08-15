import "./SearchSection.css";

function SearchSection({
  filterValues: { searchValue, setSearchValue, priceRange, setPriceRange },
}) {
  return (
    <section className="search-section flex fancy-background">
      <label id="search-lable">
        <input
          id="search"
          type="search"
          name="searchBy"
          placeholder="Search by book name"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </label>

      <select
        title="Select price range"
        name="priceRange"
        id="select"
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
