import "../App.css";
import PropTypes from "prop-types";

BookItem.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  authors: PropTypes.arrayOf(PropTypes.string),
};

function BookItem({ url, name, authors }) {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${url}")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select>
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{name}</div>
      <div className="book-authors">{authors?.join(", ")}</div>
    </div>
  );
}

export default BookItem;
