import { 
  FETCH_BOOKS_REQUEST, 
  FETCH_BOOKS_SUCCESS, 
  FETCH_BOOKS_FAILURE, 
  SET_SORTING 
} from './actions';

const initialState = {
  books: [],
  loading: false,
  error: null,
  sortBy: 'Title',     // Default sort criteria: Title, Author, or Publisher
  sortOrder: 'Ascending' // Default sort order: Ascending or Descending
};

export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_BOOKS_SUCCESS:
      return { ...state, loading: false, books: action.payload };
    case FETCH_BOOKS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_SORTING:
      return { 
        ...state, 
        sortBy: action.payload.sortBy, 
        sortOrder: action.payload.sortOrder 
      };
    default:
      return state;
  }
};