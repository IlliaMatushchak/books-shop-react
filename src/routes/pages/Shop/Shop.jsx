import React, { useState } from "react";
import { useBooks } from "../../../hooks/useBooks";
import BookList from "../../../containers/BooksList/BooksList";
import SearchSection from "../../../components/SearchSection/SearchSection";

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
  let filteredBooks = books.filter(({ title }) => {
    return title.toLowerCase().includes(name.toLowerCase());
  });

  return filteredBooks;
};

function Shop() {
  const books = useBooks();
  const [searchValue, setSearchValue] = useState("");
  const [priceRange, setPriceRange] = useState("[0, 9999]");

  const filteredBooks = filterBooksByName(
    filterBooksByPriceRange(books, priceRange),
    searchValue
  );

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
