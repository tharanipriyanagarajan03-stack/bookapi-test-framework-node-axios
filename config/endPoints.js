module.exports = {
  BASE_URL: "http://127.0.0.1:8000/",
  AUTH: {
    SIGNUP: '/signup',
    LOGIN: '/login'
  },
  HEALTH: '/health',  
  BOOK: {
    CREATE_BOOK: '/books',
    UPDATE_BOOK_DATA: '/books/{0}',
    GET_ALL_BOOKS: '/books',
    GET_BOOK_BY_ID: '/books/{0}',
    DELETE_BOOK_BY_ID: '/books/{0}'
  }
};