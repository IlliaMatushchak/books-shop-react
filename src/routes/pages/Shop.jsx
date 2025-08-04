import React, { useState } from "react";
import { useBooks } from "../../hooks/useBooks";
import BookList from "../../containers/BooksList";
import SearchSection from "../../components/SearchSection";

function Shop() {
  const books = useBooks();

  return (
    <>
      <SearchSection />
      <BookList books={books} />
    </>
  );
}

export default Shop;
