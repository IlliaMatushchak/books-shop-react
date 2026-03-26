import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { BookService } from "../../../services/bookService";
import useControlledFetch from "../../../hooks/useControlledFetch";
import BookForm from "../../../components/BookForm/BookForm";
import ErrorFallback from "../../../components/ErrorFallback/ErrorFallback";
import Loader from "../../../components/Loader/Loader";

function EditBook() {
  const { bookID } = useParams();

  const {
    data: book,
    loading,
    error,
    cancel,
    refetch,
    fetch: fetchBook,
  } = useControlledFetch({ requestFn: BookService.getById, args: [bookID], auto: true });

  const updateBook = useCallback(
    (newBook) => {
      fetchBook({
        requestFn: BookService.update,
        args: [bookID, newBook],
      });
    },
    [fetchBook, bookID],
  );

  if (loading && !book) {
    return <Loader type="named" />;
  }

  if (error) {
    return <ErrorFallback error={error} refetch={refetch} />;
  }

  if (!book) return null;

  return (
    <BookForm
      submitLabel="Edit"
      initialValues={book}
      onSubmit={updateBook}
      onCancel={cancel}
      onReset={refetch}
      isSubmitting={loading}
    />
  );
}

export default EditBook;
