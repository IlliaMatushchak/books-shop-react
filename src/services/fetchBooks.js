import data from "../data/books.json";

const fetchBooks = (src = "") => {
  console.log("Fetching books");

  return new Promise((resolve, reject) => {
    let delay = Math.floor(Math.random() * 3000 + 1);

    if (delay < 2000) {
      setTimeout(() => {
        if (src === "/books") {
          resolve(data.books);
        } else {
          let index = src.lastIndexOf("/");
          let bookID = Number(src.substring(index + 1));

          const currentBook = data.books.find(({ id }) => id === bookID);
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
