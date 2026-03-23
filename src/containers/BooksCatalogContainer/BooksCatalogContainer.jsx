import { useEffect, useMemo, useState } from "react";
import useProcessedBooks from "../../hooks/useProcessedBooks";
import { calculateMinAndMaxPrice, getAllUniqueTags } from "../../utils/bookUtils";
import SearchSection from "../../components/SearchSection/SearchSection";
import Message from "../../components/Message/Message";

export default function BooksCatalogContainer({ books, children }) {
  const [filtersConfig, setFiltersConfig] = useState({
    searchValue: "",
    priceRange: [0, Infinity],
    tags: new Set(),
  });
  const updateFilter = (key, value) => {
    setFiltersConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const [sortType, setSortType] = useState("");
  const processedBooks = useProcessedBooks(books, filtersConfig, sortType);
  const tagOptions = useMemo(() => getAllUniqueTags(books), [books]);

  useEffect(() => {
    if (books.length !== 0) {
      updateFilter("priceRange", calculateMinAndMaxPrice(books));
    }
  }, [books]);

  return (
    <>
      <SearchSection
        filtersConfig={filtersConfig}
        updateFilter={updateFilter}
        sortType={sortType}
        setSortType={setSortType}
        tagOptions={tagOptions}
      />
      {books.length === 0 ? (
        <Message message="No books found!" type="global" />
      ) : processedBooks.length === 0 ? (
        <Message message="There are no books matching your filters!" type="global" />
      ) : typeof children === "function" ? (
        children(processedBooks)
      ) : (
        children
      )}
    </>
  );
}
