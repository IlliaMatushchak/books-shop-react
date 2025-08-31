import React, { useState, useMemo } from "react";
import { useBooks } from "../../../hooks/useBooks";
import BookList from "../../../containers/BooksList/BooksList";
import SearchSection from "../../../components/SearchSection/SearchSection";
import useDebouncedValue from "../../../hooks/useDebouncedValue";

const filterBooksByPriceRange = (books, range) => {
  let priceRange = JSON.parse(range);
  let filteredBooks = books.filter(({ price }) => {
    let minPrice = priceRange[0],
      maxPrice = priceRange[1];
    return price > minPrice && price < maxPrice;
  });

  return filteredBooks;
};

const filterBooksByName = (books, name) => {
  console.log('Filtering');
  let filteredBooks = books.filter(({ title }) => {
    return title.toLowerCase().includes(name.toLowerCase());
  });

  return filteredBooks;
};

function Shop() {
  console.log("Shop render");
  const books = useBooks();
  const [searchValue, setSearchValue] = useState("");
  const [priceRange, setPriceRange] = useState("[0, 9999]");
  const debouncedSearchValue = useDebouncedValue(searchValue, 500);

  console.time("filter");
  const filteredBooks = useMemo(() => {
    return filterBooksByName(
      filterBooksByPriceRange(books, priceRange),
      debouncedSearchValue
    );
  }, [priceRange, debouncedSearchValue, books]);
  console.timeEnd("filter");

  return (
    <>
      <SearchSection
        filterValues={{
          searchValue,
          setSearchValue,
          priceRange,
          setPriceRange,
        }}
      />
      <BookList books={filteredBooks} />
    </>
  );
}

export default Shop;
