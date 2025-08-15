import { Link } from "react-router-dom";
import imgNotFound from "../../assets/images/imgNotFound.png";
import "./BookCard.css";

function BookCard({ image, title, author, price, id }) {
  return (
    <>
      <div className="book-card fancy-background">
        <div className="img-container">
          <div
            className="book-img"
            style={{ backgroundImage: `url(${image || imgNotFound})` }}
          ></div>
        </div>

        <h2>{title}</h2>
        <p>{author}</p>
        <div className="flex">
          <p>Price: {price}</p>
          <Link to={`/specific-book/${id}`} className="btn-view a-like-btn">
            View
          </Link>
        </div>
      </div>
    </>
  );
}

export default BookCard;
