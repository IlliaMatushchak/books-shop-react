import React, { useState } from "react";
import { useBooks } from "../../hooks/useBooks";
import BookList from "../../containers/BooksList";
import SearchSection from "../../components/SearchSection";

const filterBooksByPrice = (books, range) => {
  let priceRange;
  switch (range) {
    case "low":
      priceRange = [0, 15];
      break;
    case "medium":
      priceRange = [15, 30];
      break;
    case "high":
      priceRange = [30, 9999];
      break;
    default:
      return books;
  }

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
  const [priceRange, setPriceRange] = useState("");

  const filteredBooks = filterBooksByName(
    filterBooksByPrice(books, priceRange),
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
