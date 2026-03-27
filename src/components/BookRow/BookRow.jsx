import { memo } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import imgNotFound from "../../assets/images/imgNotFound.png";
import LazyImage from "../LazyImage/LazyImage";
import "./BookRow.css";

const BookRow = memo(function BookRow({ book, onDelete }) {
  return (
    <tr className="book-row">
      <td>{book?.id}</td>

      <td>
        <LazyImage className="book-row-image" src={book?.image || imgNotFound} alt="Book image" />
      </td>

      <td className="book-row-title">{book?.title}</td>
      <td>{book?.author}</td>

      <td>
        <span className={`book-row-level book-row-level-${book?.level?.toLowerCase()}`}>
          {book?.level}
        </span>
      </td>

      <td>
        <div className="book-row-tags">
          {book?.tags?.map((tag) => (
            <span key={tag} className="book-row-tag">
              {tag}
            </span>
          ))}
        </div>
      </td>

      <td>${book?.price?.toFixed(2)}</td>
      <td>{book?.amount}</td>
      <td className="book-row-description">{book?.shortDescription}</td>

      <td>
        <div className="book-row-actions">
          <Link
            to={`${ROUTES.ADMIN_BOOK_EDIT}/${book?.id}`}
            className="btn btn-effect-press book-row-btn-edit"
          >
            Edit
          </Link>

          <button
            type="button"
            className="btn btn-effect-press book-row-btn-delete"
            onClick={() => {
              onDelete(book?.id);
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
});

export default BookRow;
