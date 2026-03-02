import { useState } from "react";
import useControlledFetch from "../../../hooks/useControlledFetch";
import useProcessedBooks from "../../../hooks/useProcessedBooks";
import { BookService } from "../../../services/bookService";

import BookList from "../../../containers/BooksList/BooksList";
import SearchSection from "../../../components/SearchSection/SearchSection";
import Loader from "../../../components/Loader/Loader";
import ErrorFallback from "../../../components/ErrorFallback/ErrorFallback";
import Message from "../../../components/Message/Message";

function Shop() {
  const [filtersConfig, setFiltersConfig] = useState({
    searchValue: "",
    priceRange: [0, 9999],
  });
  const [sortType, setSortType] = useState("");
  const {
    data: books,
    loading,
    error,
    refetch,
  } = useControlledFetch({ requestFn: BookService.getAll, initialData: [], auto: true });
  const processedBooks = useProcessedBooks(books, filtersConfig, sortType);

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
