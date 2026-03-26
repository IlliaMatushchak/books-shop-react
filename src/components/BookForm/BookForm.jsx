import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import "./BookForm.css";

const DEFAULT_FORM_DATA = {
  title: "",
  author: "",
  price: "",
  amount: "",
  level: "Beginner",
  tags: [],
  shortDescription: "",
  description: "",
  image: "",
};

const LEVEL_OPTIONS = ["Beginner", "Middle", "Pro"];

function BookForm({
  initialValues = DEFAULT_FORM_DATA,
  onSubmit,
  onCancel,
  onReset,
  submitLabel = "Save Book",
  isSubmitting = false,
}) {
  const [formData, setFormData] = useState(initialValues);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  function updateField(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    updateField(name, value);
  }

  function handleAddTag() {
    const normalizedTag = tagInput.trim();

    if (!normalizedTag) return;
    if (formData.tags?.includes(normalizedTag)) {
      setTagInput("");
      return;
    }

    updateField("tags", [...formData.tags, normalizedTag]);
    setTagInput("");
  }

  function handleTagKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTag();
    }
  }

  function handleRemoveTag(tagToRemove) {
    updateField(
      "tags",
      formData.tags?.filter((tag) => tag !== tagToRemove),
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    const preparedData = {
      ...formData,
      price: Number(formData.price),
      amount: Number(formData.amount),
    };

    onSubmit?.(preparedData);
  }

  return (
    <form className="book-form fancy-background" onSubmit={handleSubmit}>
      {isSubmitting && <Loader type="local" />}
      <div className="book-form-header">
        <h2 className="book-form-title">Book Details</h2>
        <p className="book-form-subtitle">
          Fill in the form to create or update a book in the catalog.
        </p>
      </div>

      <div className="book-form-grid">
        <div className="book-form-field">
          <label className="book-form-label" htmlFor="title">
            Title
          </label>
          <input
            className="book-form-input field focus-shadow"
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
          />
        </div>

        <div className="book-form-field">
          <label className="book-form-label" htmlFor="author">
            Author
          </label>
          <input
            className="book-form-input field focus-shadow"
            id="author"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />
        </div>

        <div className="book-form-field">
          <label className="book-form-label" htmlFor="price">
            Price
          </label>
          <input
            className="book-form-input field focus-shadow"
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            required
          />
        </div>

        <div className="book-form-field">
          <label className="book-form-label" htmlFor="amount">
            Amount
          </label>
          <input
            className="book-form-input field focus-shadow"
            id="amount"
            name="amount"
            type="number"
            min="0"
            step="1"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0"
            required
          />
        </div>

        <div className="book-form-field">
          <label className="book-form-label" htmlFor="level">
            Level
          </label>
          <select
            className="book-form-input field focus-shadow"
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          >
            {LEVEL_OPTIONS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="book-form-field">
          <label className="book-form-label" htmlFor="image">
            Image URL
          </label>
          <input
            className="book-form-input field focus-shadow"
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/book-cover.jpg"
          />
        </div>

        <div className="book-form-field book-form-field-full">
          <label className="book-form-label" htmlFor="tags">
            Tags
          </label>

          <div className="book-form-tags-input-wrap">
            <input
              className="book-form-input field focus-shadow"
              id="tags"
              name="tags"
              type="text"
              value={tagInput}
              onChange={(event) => setTagInput(event.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Type a tag and press Enter"
            />
            <button
              className="book-form-tag-add-btn btn btn-effect-press"
              type="button"
              onClick={handleAddTag}
            >
              Add Tag
            </button>
          </div>

          {formData.tags?.length > 0 && (
            <div className="book-form-tags-list">
              {formData.tags?.map((tag) => (
                <button
                  key={tag}
                  className="book-form-tag btn btn-effect-3d"
                  type="button"
                  aria-label="Remove tag"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <span>{tag}</span>
                  <span className="book-form-tag-remove">x</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="book-form-field book-form-field-full">
          <label className="book-form-label" htmlFor="shortDescription">
            Short Description
          </label>
          <textarea
            className="book-form-textarea book-form-textarea-short field focus-shadow"
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Enter a short description"
            rows="3"
            required
          />
        </div>

        <div className="book-form-field book-form-field-full">
          <label className="book-form-label" htmlFor="description">
            Full Description
          </label>
          <textarea
            className="book-form-textarea field focus-shadow"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a full description"
            rows="6"
            required
          />
        </div>
      </div>

      <div className="book-form-actions">
        {isSubmitting ? (
          onCancel && (
            <button
              className="book-form-secondary-btn btn btn-effect-press"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
          )
        ) : (
          <>
            {onReset && (
              <button
                className="book-form-secondary-btn btn btn-effect-press"
                type="button"
                onClick={onReset}
              >
                Reset
              </button>
            )}
            <button
              className="book-form-submit-btn btn btn-effect-press"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : submitLabel}
            </button>
          </>
        )}
      </div>
    </form>
  );
}

export default BookForm;
