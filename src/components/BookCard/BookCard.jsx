import { memo } from "react";
import { Link } from "react-router-dom";
import imgNotFound from "../../assets/images/imgNotFound.png";
import "./BookCard.css";
import LazyImage from "../LazyImage/LazyImage";

const BookCard = memo(function BookCard({ image, title, author, price, id }) {
  console.log(`Render card ${id}`);

  return (
    <>
      <div className="book-card fancy-background">
        <div className="img-container">
          <LazyImage
            className="book-img"
            src={image || imgNotFound}
            alt={title}
          />
        </div>

        <h2>{title}</h2>
        <p>{author}</p>
        <div className="flex">
          <p>Price: {price}</p>
          <Link
            to={`/specific-book/${id}`}
            className="a-like-btn btn-effect-press"
          >
            View
          </Link>
        </div>
      </div>
    </>
  );
});

export default BookCard;
