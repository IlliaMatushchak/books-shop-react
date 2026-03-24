import { memo } from "react";
import BookRow from "../../components/BookRow/BookRow";
import "./BooksTable.css";

const BooksTable = memo(function BooksTable({ books }) {
  return (
    <div className="books-table-wrapper">
      <table className="books-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cover</th>
            <th>Title</th>
            <th>Author</th>
            <th>Level</th>
            <th>Tags</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Short Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => {
            return <BookRow key={book.id} book={book} />;
          })}
        </tbody>
      </table>
    </div>
  );
});

export default BooksTable;
