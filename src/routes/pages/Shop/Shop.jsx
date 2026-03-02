import { useState } from "react";
import useControlledFetch from "../../../hooks/useControlledFetch";
import useBooksFilters from "../../../hooks/useBooksFilters";
import { BookService } from "../../../services/bookService";

import BookList from "../../../containers/BooksList/BooksList";
import SearchSection from "../../../components/SearchSection/SearchSection";
import Loader from "../../../components/Loader/Loader";
import ErrorFallback from "../../../components/ErrorFallback/ErrorFallback";

function Shop() {
  const [filtersConfig, setFiltersConfig] = useState({
    searchValue: "",
    priceRange: [0, 9999],
  });
  const {
    data: books,
    loading,
    error,
    refetch,
  } = useControlledFetch({ requestFn: BookService.getAll, initialData: [], auto: true });
  const filteredBooks = useBooksFilters(books, filtersConfig);

  if (loading) {
    return <Loader type="named" />;
  }
  if (error) {
    return <ErrorFallback error={error} refetch={refetch} />;
  }

  return (
    <>
      <SearchSection filtersConfig={filtersConfig} setFiltersConfig={setFiltersConfig} />
      <BookList books={filteredBooks} />
    </>
  );
}

export default Shop;
