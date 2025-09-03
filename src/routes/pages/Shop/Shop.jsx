import React, { useState, useMemo, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import useDebouncedValue from "../../../hooks/useDebouncedValue";

import BookList from "../../../containers/BooksList/BooksList";
import SearchSection from "../../../components/SearchSection/SearchSection";
import Loader from "../../../components/Loader/Loader";

const filterBooksByPriceRange = (books, range) => {
  if (!books || !books.length) {
    return [];
  }
  let priceRange = JSON.parse(range);
  let filteredBooks = books.filter(({ price }) => {
    let minPrice = priceRange[0],
      maxPrice = priceRange[1];
    return price > minPrice && price < maxPrice;
  });

  return filteredBooks;
};

const filterBooksByName = (books, name) => {
  if (!books || !books.length) {
    return [];
  }
  console.log("Filtering");
  let filteredBooks = books.filter(({ title }) => {
    return title.toLowerCase().includes(name.toLowerCase());
  });

  return filteredBooks;
};

function Shop() {
  console.log("Shop render");

  const [searchValue, setSearchValue] = useState("");
  const [priceRange, setPriceRange] = useState("[0, 9999]");
  const debouncedSearchValue = useDebouncedValue(searchValue, 500);
  const { data: books, loading, error } = useFetch("/books");

  // console.time("filter");
  const filteredBooks = useMemo(() => {
    return filterBooksByName(
      filterBooksByPriceRange(books, priceRange),
      debouncedSearchValue
    );
  }, [priceRange, debouncedSearchValue, books]);
  // console.timeEnd("filter");

  if (loading) {
    return <Loader type="named"/>;
  }
  if (error) {
    return <div>{error}</div>;
  }

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
