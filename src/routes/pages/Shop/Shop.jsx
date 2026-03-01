import { useState, useMemo } from "react";
import useControlledFetch from "../../../hooks/useControlledFetch";
import useDebouncedValue from "../../../hooks/useDebouncedValue";
import { BookService } from "../../../services/bookService";

import BookList from "../../../containers/BooksList/BooksList";
import SearchSection from "../../../components/SearchSection/SearchSection";
import Loader from "../../../components/Loader/Loader";
import ErrorFallback from "../../../components/ErrorFallback/ErrorFallback";

const createPriceFilter = (priceRange = []) => {
  const [minPrice, maxPrice] = priceRange;
  return (book) => book.price >= minPrice && book.price <= maxPrice;
};

const createNameFilter = (searchValue = "") => {
  const normalizedName = searchValue.trim().toLowerCase();
  if (!normalizedName) return () => true;

  return (book) => book.title.toLowerCase().includes(normalizedName);
};

const applyFilters = (books = [], filters = []) => {
  return books.filter((book) => filters.every((filter) => filter(book)));
};

function Shop() {
  const [searchValue, setSearchValue] = useState("");
  const [priceRange, setPriceRange] = useState("[0, 9999]");
  const debouncedSearchValue = useDebouncedValue(searchValue, 500);
  const {
    data: books,
    loading,
    error,
    refetch,
  } = useControlledFetch({ requestFn: BookService.getAll, initialData: [], auto: true });

  // console.time("filter");
  const filteredBooks = useMemo(() => {
    const filters = [
      createNameFilter(debouncedSearchValue),
      createPriceFilter(JSON.parse(priceRange)),
    ];

    return applyFilters(books, filters);
  }, [priceRange, debouncedSearchValue, books]);
  // console.timeEnd("filter");

  if (loading) {
    return <Loader type="named" />;
  }
  if (error) {
    return <ErrorFallback error={error} refetch={refetch} />;
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
