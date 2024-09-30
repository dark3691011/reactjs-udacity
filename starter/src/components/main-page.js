import "../App.css";
import { useState, useEffect } from "react";
import { getAll } from "../BooksAPI";
import BookShelf from "./book-shelf";
import { shelfType } from "../constants/index";

function MainPage() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  const [wantToReadBooks, setwantToReadBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);

  useEffect(async () => {
    const resBooks = await getAll();
    setCurrentlyReadingBooks(
      resBooks?.filter((e) => e.shelf === shelfType.currentlyReading)
    );
    setwantToReadBooks(
      resBooks?.filter((e) => e.shelf === shelfType.wantToRead)
    );
    setReadBooks(resBooks?.filter((e) => e.shelf === shelfType.read));
  }, []);

  return (
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
            />
          }
          {<BookShelf title="Want to Read" books={wantToReadBooks} />}
          {<BookShelf title="Read" books={readBooks} />}
        </div>
      </div>
      <div className="open-search">
        <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
      </div>
    </div>
  );
}

export default MainPage;
