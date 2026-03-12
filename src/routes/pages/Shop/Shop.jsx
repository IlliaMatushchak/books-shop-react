import { useEffect, useMemo, useState } from "react";
import useControlledFetch from "../../../hooks/useControlledFetch";
import useProcessedBooks from "../../../hooks/useProcessedBooks";
import { BookService } from "../../../services/bookService";
import { calculateMinAndMaxPrice, getAllUniqueTags } from "../../../utils/bookUtils";

import BookList from "../../../containers/BooksList/BooksList";
import SearchSection from "../../../components/SearchSection/SearchSection";
import Loader from "../../../components/Loader/Loader";
import ErrorFallback from "../../../components/ErrorFallback/ErrorFallback";
import Message from "../../../components/Message/Message";

function Shop() {
  const [filtersConfig, setFiltersConfig] = useState({
    searchValue: "",
    priceRange: [0, Infinity],
    tags: new Set(),
  });
  const [sortType, setSortType] = useState("");
  const {
    data: books,
    loading,
    error,
    refetch,
  } = useControlledFetch({ requestFn: BookService.getAll, initialData: [], auto: true });
  const processedBooks = useProcessedBooks(books, filtersConfig, sortType);
  const tagOptions = useMemo(() => getAllUniqueTags(books), [books]);

  useEffect(() => {
    if (books.length !== 0) {
      let priceRange = calculateMinAndMaxPrice(books);
      setFiltersConfig((prev) => ({ ...prev, priceRange }));
    }
  }, [books]);

  if (loading) {
    return <Loader type="named" />;
  }
  if (error) {
    return <ErrorFallback error={error} refetch={refetch} />;
  }

  return (
    <>
      <SearchSection
        filtersConfig={filtersConfig}
        setFiltersConfig={setFiltersConfig}
        sortType={sortType}
        setSortType={setSortType}
        tagOptions={tagOptions}
      />
      {books.length === 0 ? (
        <Message message="No books found!" type="global" />
      ) : processedBooks.length === 0 ? (
        <Message message="There are no books matching your filters!" type="global" />
      ) : (
        <BookList books={processedBooks} />
      )}
    </>
  );
}

export default Shop;
