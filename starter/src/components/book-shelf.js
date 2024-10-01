import BookItem from "./book-item";
import "../App.css";
import PropTypes from "prop-types";

BookShelf.prototype = {
  title: PropTypes.string,
  books: PropTypes.array,
  onUpdateEvent: PropTypes.func,
};

function BookShelf({ title, books, onUpdateEvent }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books?.map((e) => {
            return (
              <li key={e.title}>
                <BookItem book={e} onUpdateEvent={onUpdateEvent} />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default BookShelf;
