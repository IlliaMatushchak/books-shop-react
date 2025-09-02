import React, { useState, useMemo, useEffect } from "react";
import fetchBooks from "../../../services/fetchBooks";
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
  console.log("Filtering");
  let filteredBooks = books.filter(({ title }) => {
    return title.toLowerCase().includes(name.toLowerCase());
  });

  return filteredBooks;
};

function Shop() {
  console.log("Shop render");
  const [books, setBooks] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [priceRange, setPriceRange] = useState("[0, 9999]");
  const debouncedSearchValue = useDebouncedValue(searchValue, 500);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchBooks()
      .then((response) => {
        setBooks(response);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // console.time("filter");
  const filteredBooks = useMemo(() => {
    return filterBooksByName(
      filterBooksByPriceRange(books, priceRange),
      debouncedSearchValue
    );
  }, [priceRange, debouncedSearchValue, books]);
  // console.timeEnd("filter");

  if (loading) {
    return <div>Loading...</div>;
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
