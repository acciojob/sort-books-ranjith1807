export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const SET_SORTING = 'SET_SORTING';

export const fetchBooks = () => (dispatch) => {
  dispatch({ type: FETCH_BOOKS_REQUEST });
  
  // Note: Ensure your actual NYT API key is replacing 'YOUR_API_KEY'
  fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=nFrGgG9ZQXto6nKyu2bcHdUziG9BWuWN5xcNjemrMJX5AX3g')
    .then((response) => response.json())
    .then((data) => {
      // Defensive check for testing environments
      if (data && data.results && Array.isArray(data.results.books)) {
        dispatch({ type: FETCH_BOOKS_SUCCESS, payload: data.results.books });
      } else {
        dispatch({ type: FETCH_BOOKS_SUCCESS, payload: [] });
      }
    })
    .catch((error) => {
      dispatch({ type: FETCH_BOOKS_FAILURE, payload: error.message });
    });
};

export const setSorting = (sortBy, sortOrder) => ({
  type: SET_SORTING,
  payload: { sortBy, sortOrder }
});