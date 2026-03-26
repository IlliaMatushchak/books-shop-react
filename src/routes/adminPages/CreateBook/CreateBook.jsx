import { useCallback } from "react";
import { BookService } from "../../../services/bookService";
import useControlledFetch from "../../../hooks/useControlledFetch";
import BookForm from "../../../components/BookForm/BookForm";
import ErrorFallback from "../../../components/ErrorFallback/ErrorFallback";

function CreateBook() {
  const { loading, error, cancel, fetch: fetchBook } = useControlledFetch({ auto: false });

  const createBook = useCallback(
    (book) => {
      fetchBook({ requestFn: BookService.create, args: [book] });
    },
    [fetchBook],
  );

  if (error) {
    return <ErrorFallback error={error} />;
  }

  return (
    <BookForm submitLabel="Create" onSubmit={createBook} onCancel={cancel} isSubmitting={loading} />
  );
}

export default CreateBook;
