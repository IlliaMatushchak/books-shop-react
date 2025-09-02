import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchBooks from "../../../services/fetchBooks";

import "./SpecificBook.css";
import BookSection from "../../../components/BookSection/BookSection";
import OrderSection from "../../../components/OrderSection/OrderSection";

function SpecificBook() {
  console.log('Book page render');
  
  const { bookID } = useParams();
  const [specificBook, setSpecificBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchBooks(bookID)
      .then((response) => {
        setSpecificBook(response);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [bookID]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    specificBook && (
      <div className="specific-book-container flex">
        <BookSection book={specificBook} />
        <OrderSection
          price={specificBook.price}
          amount={specificBook.amount}
          title={specificBook.title}
          bookID={bookID}
        />
      </div>
    )
  );
}

export default SpecificBook;
