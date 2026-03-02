import { useMemo } from "react";

const sortsConfig = {
  name: (a, b) => a.title.localeCompare(b.title),
  lowPrice: (a, b) => a.price - b.price,
  highPrice: (a, b) => b.price - a.price,
};

const sortBooks = (books = [], sortType = "") => {
  const sortFn = sortsConfig[sortType];

  if (typeof sortFn === "function") {
    return [...books].sort(sortFn);
  } else {
    return books;
  }
};

function useBooksSort(books, sortType) {
  const sortedBooks = useMemo(() => sortBooks(books, sortType), [books, sortType]);

  return sortedBooks;
}

export default useBooksSort;
