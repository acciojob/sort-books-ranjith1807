// Action Types
export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const SET_SORTING = 'SET_SORTING';

// Thunk to fetch books from NYT API
// Thunk to fetch books from NYT API using standard Promises
export const fetchBooks = () => (dispatch) => {
  dispatch({ type: FETCH_BOOKS_REQUEST });
  
  // Note: Replace 'YOUR_API_KEY' with a valid NYT API Key
  fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=nFrGgG9ZQXto6nKyu2bcHdUziG9BWuWN5xcNjemrMJX5AX3g')
    .then((response) => response.json())
    .then((data) => {
      // The NYT API stores the book array inside results.books
      dispatch({ type: FETCH_BOOKS_SUCCESS, payload: data.results.books });
    })
    .catch((error) => {
      dispatch({ type: FETCH_BOOKS_FAILURE, payload: error.message });
    });
};

// Action to set sorting criteria and order
export const setSorting = (sortBy, sortOrder) => ({
  type: SET_SORTING,
  payload: { sortBy, sortOrder }
});