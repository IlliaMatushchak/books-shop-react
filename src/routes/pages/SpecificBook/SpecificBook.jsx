import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

import "./SpecificBook.css";
import BookSection from "../../../components/BookSection/BookSection";
import OrderSection from "../../../components/OrderSection/OrderSection";

function SpecificBook() {
  console.log("Book-page render");

  const { bookID } = useParams();
  const { data: specificBook, loading, error } = useFetch(`/books/${bookID}`);

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
