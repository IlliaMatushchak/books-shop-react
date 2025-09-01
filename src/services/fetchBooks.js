import data from "../data/books.json";

const fetchBooks = (bookID) => {
  console.log("Fetching books");

  return new Promise((resolve, reject) => {
    let delay = Math.floor(Math.random() * 3000 + 1);

    if (delay < 2000) {
      setTimeout(() => {
        if (bookID === undefined) {
          resolve(data.books);
        } else {
          const currentBook = data.books.find(
            ({ id }) => id === Number(bookID)
          );
          resolve(currentBook);
        }
      }, delay);
    } else {
      setTimeout(() => {
        reject(new Error("Failed to fetch books"));
      }, delay);
    }
  });
};

export default fetchBooks;
