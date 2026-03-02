import useBooksFilters from "./useBooksFilters";
import useBooksSort from "./useBooksSort";

function useProcessedBooks(books, filtersConfig, sortType) {
  const filteredBooks = useBooksFilters(books, filtersConfig);
  const sortedBooks = useBooksSort(filteredBooks, sortType);

  return sortedBooks;
}

export default useProcessedBooks;
