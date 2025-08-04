import "../assets/styles/SearchSection.css";

function SearchSection() {
  return (
    <section className="search-section flex fancy-background">
      <label id="search-lable">
        <input
          id="search"
          type="search"
          name="searchBy"
          placeholder="Search by book name"
        />
      </label>

      <select
        title="Select price range"
        name="priceRange"
        id="select"
        defaultValue={"title"}
      >
        <option value="title" disabled hidden>
          Price range
        </option>
        <option value="all">All prices</option>
        <option value="low">{"0$ < price < 15$"}</option>
        <option value="medium">{"15$ < price < 30$"}</option>
        <option value="high">{"price 30$ +"}</option>
      </select>
    </section>
  );
}

export default SearchSection;
