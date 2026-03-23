import useControlledFetch from "../../../hooks/useControlledFetch";
import { BookService } from "../../../services/bookService";

import BooksCatalogContainer from "../../../containers/BooksCatalogContainer/BooksCatalogContainer";
import BookList from "../../../containers/BooksList/BooksList";
import Loader from "../../../components/Loader/Loader";
import ErrorFallback from "../../../components/ErrorFallback/ErrorFallback";

function Shop() {
  const {
    data: books,
    loading,
    error,
    refetch,
  } = useControlledFetch({ requestFn: BookService.getAll, initialData: [], auto: true });

  if (loading) {
    return <Loader type="named" />;
  }
  if (error) {
    return <ErrorFallback error={error} refetch={refetch} />;
  }

  return (
    <BooksCatalogContainer books={books}>
      {(processedBooks) => <BookList books={processedBooks} />}
    </BooksCatalogContainer>
  );
}

export default Shop;
