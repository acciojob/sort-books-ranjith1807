import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, setSorting } from '../redux/actions';
// Optional: for basic table styling

const BooksList = () => {
  const dispatch = useDispatch();
  const books = useSelector(state => state.books);
const loading = useSelector(state => state.loading);
const error = useSelector(state => state.error);
const sortBy = useSelector(state => state.sortBy);
const sortOrder = useSelector(state => state.sortOrder);
  // Fetch books on component mount
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Handlers for dropdowns
  const handleSortByChange = (e) => {
    dispatch(setSorting(e.target.value, sortOrder));
  };

  const handleSortOrderChange = (e) => {
    dispatch(setSorting(sortBy, e.target.value));
  };

  // Sorting logic based on Redux state
  const sortedBooks = [...books].sort((a, b) => {
    // Map dropdown values to object keys from the NYT API
    const key = sortBy.toLowerCase(); 
    
    // Fallback to empty string to avoid errors on missing fields
    const valA = (a[key] || '').toUpperCase();
    const valB = (b[key] || '').toUpperCase();

    if (valA < valB) return sortOrder === 'Ascending' ? -1 : 1;
    if (valA > valB) return sortOrder === 'Ascending' ? 1 : -1;
    return 0;
  });

  if (loading) return <div className="status">Loading books...</div>;
  if (error) return <div className="status error">Error: {error}</div>;

  return (
    <div className="books-container">
      <h2>New York Times Bestsellers</h2>
      
      {/* Container specifically structured for nth-child Cypress selectors */}
      <div className="sorting-controls">
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="Title">Title</option>
          <option value="Author">Author</option>
          <option value="Publisher">Publisher</option>
        </select>
        
        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.map((book) => (
            <tr key={book.primary_isbn13 || book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.primary_isbn13 || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;