import "../App.css";
import { useState, useEffect } from "react";
import { getAll } from "../BooksAPI";
import BookShelf from "./book-shelf";
import { Link } from "react-router-dom";

import { shelfType } from "../constants/index";

function MainPage() {
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  const [wantToReadBooks, setwantToReadBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);

  useEffect(async () => {
    await fetchBook();
  }, []);

  const fetchBook = async () => {
    const resBooks = await getAll();
    setCurrentlyReadingBooks(
      resBooks?.filter((e) => e.shelf === shelfType.currentlyReading)
    );
    setwantToReadBooks(
      resBooks?.filter((e) => e.shelf === shelfType.wantToRead)
    );
    setReadBooks(resBooks?.filter((e) => e.shelf === shelfType.read));
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
                books={currentlyReadingBooks}
                onUpdateEvent={fetchBook}
              />
            }
            {
              <BookShelf
                title="Want to Read"
                books={wantToReadBooks}
                onUpdateEvent={fetchBook}
              />
            }
            {
              <BookShelf
                title="Read"
                books={readBooks}
                onUpdateEvent={fetchBook}
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
