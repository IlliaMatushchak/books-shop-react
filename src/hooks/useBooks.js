import { createContext, useContext } from "react";

const BooksContext = createContext(null);

const BooksProvider = BooksContext.Provider;

const useBooks = () => useContext(BooksContext);

export {BooksProvider, useBooks};