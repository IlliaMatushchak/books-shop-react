import { useCallback } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import useControlledFetch from "../../../hooks/useControlledFetch";
import { BookService } from "../../../services/bookService";

import BooksCatalogContainer from "../../../containers/BooksCatalogContainer/BooksCatalogContainer";
import BooksTable from "../../../containers/BooksTable/BooksTable";
import Loader from "../../../components/Loader/Loader";
import ErrorFallback from "../../../components/ErrorFallback/ErrorFallback";

import "./ManageBooks.css";

function ManageBooks() {
  const {
    data: books,
    setData: setBooks,
    loading,
    error,
    fetch: fetchBook,
    refetch,
  } = useControlledFetch({ requestFn: BookService.getAll, initialData: [], auto: true });

  const handleDelete = useCallback(
    (bookID) => {
      fetchBook({
        requestFn: BookService.delete,
        args: [bookID],
        onSuccess: () => {
          setBooks((books) => books.filter(({ id }) => id !== bookID));
        },
      });
    },
    [fetchBook, setBooks],
  );

  if (error) {
    return <ErrorFallback error={error} refetch={refetch} />;
  }

  if (!Array.isArray(books)) {
    return null;
  }

  return (
    <BooksCatalogContainer books={books}>
      {(processedBooks) => {
        return (
          <section className="manage-books fancy-background">
            {loading && <Loader type="local" />}
            <div className="manage-books-header">
              <div>
                <h2 className="manage-books-title">Manage Books</h2>
                <p className="manage-books-subtitle">
                  Here you can view, edit, and remove books from the store catalog.
                </p>
              </div>
              <Link
                to={ROUTES.ADMIN_BOOK_CREATE}
                className="btn btn-effect-press manage-books-add-button"
              >
                Add New Book
              </Link>
            </div>
            <BooksTable books={processedBooks} onDelete={handleDelete} />
          </section>
        );
      }}
    </BooksCatalogContainer>
  );
}

export default ManageBooks;
