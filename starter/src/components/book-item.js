import "../App.css";
import PropTypes from "prop-types";
import { update } from "../BooksAPI";
import { shelfType } from "../constants/index";

BookItem.propTypes = {
  book: PropTypes.any,
  onUpdateEvent: PropTypes.func,
};

function BookItem({ book, onUpdateEvent }) {
  const options = [
    {
      value: shelfType.currentlyReading,
      label: "Currently Reading",
      key: shelfType.currentlyReading,
    },
    {
      value: shelfType.wantToRead,
      label: "Want to Read",
      key: shelfType.wantToRead,
    },
    {
      value: shelfType.read,
      label: "Read",
      key: shelfType.read,
    },
    {
      value: shelfType.none,
      label: "None",
      key: shelfType.none,
    },
  ];

  const changeShelf = (event) => {
    update(book, event.target.value).then((res) => {
      onUpdateEvent(book.id, event.target.value);
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
            backgroundImage: `url("${book?.imageLinks?.thumbnail}")`,
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

            {options.map((e) => {
              return (
                <option key={e.key} value={e.value}>
                  {e.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors?.join(", ")}</div>
    </div>
  );
}

export default BookItem;
