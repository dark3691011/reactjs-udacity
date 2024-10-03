import "../App.css";
import { useState, useEffect } from "react";
import { getAll } from "../BooksAPI";
import BookShelf from "./book-shelf";
import { Link } from "react-router-dom";

import { shelfType } from "../constants/index";

function MainPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    const resBooks = await getAll();
    setBooks(resBooks);
  };

  const updateBook = (id, toShelf) => {
    const book = books.find((e) => e.id === id);

    if (book) {
      book.shelf = toShelf;
    }
    setBooks([...(books || [])]);
  };

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              <BookShelf
                title="Currently Reading"
                books={books?.filter(
                  (e) => e.shelf === shelfType.currentlyReading
                )}
                onUpdateEvent={updateBook}
              />
            }
            {
              <BookShelf
                title="Want to Read"
                books={books?.filter((e) => e.shelf === shelfType.wantToRead)}
                onUpdateEvent={updateBook}
              />
            }
            {
              <BookShelf
                title="Read"
                books={books?.filter((e) => e.shelf === shelfType.read)}
                onUpdateEvent={updateBook}
              />
            }
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
