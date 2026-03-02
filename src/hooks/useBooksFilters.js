import { useMemo } from "react";
import useDebouncedValue from "./useDebouncedValue";

const createPriceFilter = ([minPrice = 0, maxPrice = Infinity] = []) => {
  return (book) => book.price >= minPrice && book.price <= maxPrice;
};

const createNameFilter = (searchValue = "") => {
  const normalizedName = searchValue.trim().toLowerCase();
  if (!normalizedName) return () => true;

  return (book) => book.title.toLowerCase().includes(normalizedName);
};

const buildFilters = ({ searchValue, priceRange }) => [
  createNameFilter(searchValue),
  createPriceFilter(priceRange),
];

const applyFilters = (books = [], filters = []) => {
  return books.filter((book) => filters.every((filter) => filter(book)));
};

function useBooksFilters(books, filtersConfig) {
  const debouncedFiltersConfig = useDebouncedValue(filtersConfig, 500);

  // console.time("filter");
  const filteredBooks = useMemo(() => {
    return applyFilters(books, buildFilters(debouncedFiltersConfig));
  }, [books, debouncedFiltersConfig]);
  // console.timeEnd("filter");

  return filteredBooks;
}

export default useBooksFilters;
