import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, setSorting } from '../redux/actions';

const BooksList = () => {
  const dispatch = useDispatch();
  
  // Individual selectors for performance, with a fallback array for 'books'
  const books = useSelector(state => state.books) || [];
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
  const sortBy = useSelector(state => state.sortBy);
  const sortOrder = useSelector(state => state.sortOrder);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleSortByChange = (e) => {
    dispatch(setSorting(e.target.value, sortOrder));
  };

  const handleSortOrderChange = (e) => {
    dispatch(setSorting(sortBy, e.target.value));
  };

  const sortedBooks = [...books].sort((a, b) => {
    const key = sortBy.toLowerCase(); 
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
      <h1>Books List</h1>
      
      <div className="sorting-controls">
        <label>
          Sort by:
          <select value={sortBy} onChange={handleSortByChange}>
            <option value="Title">Title</option>
            <option value="Author">Author</option>
            <option value="Publisher">Publisher</option>
          </select>
        </label>
        
        <label>
          Order:
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </select>
        </label>
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