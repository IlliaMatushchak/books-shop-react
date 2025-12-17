import { useParams } from "react-router-dom";
import useControlledFetch from "../../../hooks/useControlledFetch";
import { BookService } from "../../../services/bookService";

import "./SpecificBook.css";
import BookSection from "../../../components/BookSection/BookSection";
import OrderSection from "../../../components/OrderSection/OrderSection";
import Loader from "../../../components/Loader/Loader";
import ErrorFallback from "../../../components/ErrorFallback/ErrorFallback";

function SpecificBook() {
  console.log("Book-page render");

  const { bookID } = useParams();
  const {
    data: specificBook,
    loading,
    error,
    refetch,
  } = useControlledFetch({
    requestFn: BookService.getById,
    args: [bookID],
    auto: true,
  });

  if (loading) {
    return <Loader type="named" />;
  }
  if (error) {
    return <ErrorFallback error={error} refetch={refetch} />;
  }

  return (
    specificBook && (
      <div className="specific-book-container flex">
        <BookSection book={specificBook} />
        <OrderSection book={specificBook} />
      </div>
    )
  );
}

export default SpecificBook;
