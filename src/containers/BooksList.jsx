import "../assets/styles/BooksList.css";
import BookCard from "../components/BookCard";

function BooksList({ books }) {
  return (
    <section className="book-list flex">
      {books.map((book) => {
        return <BookCard key={book.id} {...book} />;
      })}
    </section>
  );
}

export default BooksList;
