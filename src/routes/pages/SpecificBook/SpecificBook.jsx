import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchBooks from "../../../services/fetchBooks";

import "./SpecificBook.css";
import BookSection from "../../../components/BookSection/BookSection";
import OrderSection from "../../../components/OrderSection/OrderSection";

function SpecificBook() {
  const { bookID } = useParams();
  const [specificBook, setSpecificBook] = useState(null);

  useEffect(() => {
    fetchBooks(bookID)
    .then((response) => {
      setSpecificBook(response);
    })
    .catch((error) => {console.error(error);});
  }, [bookID]);

  return (
    specificBook && <div className="specific-book-container flex">
      <BookSection book={specificBook} />
      <OrderSection
        price={specificBook.price}
        amount={specificBook.amount}
        title={specificBook.title}
        bookID={bookID}
      />
    </div>
  );
}

export default SpecificBook;
