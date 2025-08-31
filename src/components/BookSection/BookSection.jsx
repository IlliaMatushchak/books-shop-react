import { useState } from "react";
import imgNotFound from "../../assets/images/imgNotFound.png";
import "./BookSection.css";
import LazyImage from "../LazyImage/LazyImage";

function BookSection({
  book: { author, image, title, level, tags, shortDescription, description },
}) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const btnText = `Click to see ${showFullDescription ? "less" : "more..."}`;

  function handleDescriptionClick(event) {
    event.stopPropagation();
    setShowFullDescription((prev) => !prev);
  }

  return (
    <section className="book-section">
      <div className="flex">
        <div className="img-container fancy-background">
          <LazyImage
            className="book-image"
            src={image || imgNotFound}
            alt="Book image"
          />
        </div>
        <div className="book-info fancy-background">
          <p>
            <span className="book-span">Book name: </span>
            <em>{title}</em>
          </p>
          <p>
            <span className="book-span">Book author: </span>
            <em>{author}</em>
          </p>
          <p>
            <span className="book-span">Book level: </span>
            <em>{level}</em>
          </p>
          <p>
            <span className="book-span">Book tags: </span>
            <em>{tags.join(", ")}</em>
          </p>
        </div>
      </div>

      <p
        className="book-description fancy-background"
        onClick={(e) => {
          handleDescriptionClick(e);
        }}
      >
        <span className="book-span">Description: </span>
        <span>{showFullDescription ? description : shortDescription} </span>
        <button
          type="button"
          className="btn-text"
          onClick={(e) => {
            handleDescriptionClick(e);
          }}
        >
          {btnText}
        </button>
      </p>
    </section>
  );
}

export default BookSection;
