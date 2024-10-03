import "../App.css";
import { useState } from "react";
import BookItem from "./book-item";
import { search, getAll } from "../BooksAPI";
import { Link } from "react-router-dom";
import { shelfType } from "../constants/index";

function SearchPage() {
  const [books, setBooks] = useState([]);

  const searchBook = async (keyword) => {
    if (keyword) {
      const booksSearch = await search(keyword, 20);

      if (booksSearch.error) {
        setBooks([]);
      } else {
        const booksOnList = await getAll();
        const books = [...booksSearch];
        books.forEach((book) => {
          const findBook = booksOnList?.find((e) => e.id === book.id);
          book.shelf = shelfType.none;
          if (findBook) {
            book.shelf = findBook.shelf;
          }
        });
        setBooks(books);
      }
    }
  };

  const handleChange = async (event) => {
    await searchBook(event.target.value);
  };

  return (
    <div className="app">
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books?.map((e) => {
              return (
                <li key={e.id}>
                  <BookItem book={e} onUpdateEvent={() => {}} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
