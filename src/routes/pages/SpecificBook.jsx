import { useParams } from "react-router-dom";
import { useBooks } from "../../hooks/useBooks";

import "../../assets/styles/SpecificBook.css";
import BookSection from "../../components/BookSection";
import OrderSection from "../../components/OrderSection";

function SpecificBook() {
  const books = useBooks();
  const { bookID } = useParams();

  const currentBook = books.find(({ id }) => id === Number(bookID));
  const { amount, price, title } = currentBook;

  return (
    <div className="specific-book-container flex">
      <BookSection book={currentBook} />
      <OrderSection
        price={price}
        amount={amount}
        title={title}
        bookID={bookID}
      />
    </div>
  );
}

export default SpecificBook;
