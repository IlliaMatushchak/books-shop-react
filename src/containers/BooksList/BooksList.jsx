// import { memo } from "react";
import "./BooksList.css";
import BookCard from "../../components/BookCard/BookCard";

function BooksList({ books }) {
  console.log("BookList render");
  return (
    <section className="book-list flex">
      {books.map((book) => {
        return <BookCard key={book.id} {...book} />;
      })}
    </section>
  );
};

export default BooksList;
