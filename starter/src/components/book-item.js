import "../App.css";
import PropTypes from "prop-types";
import { update } from "../BooksAPI";
import { shelfType } from "../constants/index";

BookItem.propTypes = {
  book: PropTypes.any,
  onUpdateEvent: PropTypes.func,
};

function BookItem({ book, onUpdateEvent }) {
  const changeShelf = (event) => {
    update(book, event.target.value).then((book) => {
      onUpdateEvent();
    });
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${book.imageLinks.thumbnail}")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            onChange={changeShelf}
            defaultValue={book.shelf || shelfType.none}
          >
            <option value="none" disabled>
              Move to...
            </option>
            <option value={shelfType.currentlyReading}>
              Currently Reading
            </option>
            <option value={shelfType.wantToRead}>Want to Read</option>
            <option value={shelfType.read}>Read</option>
            <option value={shelfType.none}>None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors?.join(", ")}</div>
    </div>
  );
}

export default BookItem;
