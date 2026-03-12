import { useMemo } from "react";
import useDebouncedValue from "./useDebouncedValue";

const createPriceFilter = ([minPrice = 0, maxPrice = Infinity] = []) => {
  const [min, max] = maxPrice < minPrice ? [maxPrice, minPrice] : [minPrice, maxPrice];

  return (book) => book.price >= min && book.price <= max;
};

const createNameFilter = (searchValue = "") => {
  const normalizedName = searchValue.trim().toLowerCase();
  if (!normalizedName) return () => true;

  return (book) => book.title.toLowerCase().includes(normalizedName);
};

const createTagsFilter = (tags) => {
  if (tags.size === 0) return () => true;

  return (book) => book.tags?.some((tag) => tags.has(tag));
};

const buildFilters = ({ searchValue, priceRange, tags }) => [
  createNameFilter(searchValue),
  createPriceFilter(priceRange),
  createTagsFilter(tags),
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
