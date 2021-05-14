


/**
 * find book by title
 * - title
 */
const findBookByTitle = `
SELECT id, title,  author, published_at  FROM books WHERE title=$1
`;

/**
 * find book by id
 * - id
 */
const findBookById = `
SELECT id, title,  author, published_at  FROM books WHERE id=$1
`;

/**
 * get all books
 */
const getAllBooks = `
SELECT * FROM books
`;
/**
 * add book
 * - title
 * - author
 * - published_at
 *
 */
const addBook = `
INSERT INTO 
  books(
    title, 
    author, 
    published_at,
    user_id
  ) 
VALUES ($1,$2,$3,$4) RETURNING id, title, author, published_at`;

const updateBookQuery = `
UPDATE books SET title=$1, author=$2, created_at=NOW(), updated_at=NOW() WHERE id=$3 RETURNING id, title, author, published_at, created_at, updated_at`;

const removeBookQuery = `
DELETE FROM books WHERE id=$1`;

module.exports = {
    getAllBooks,
    addBook,
    findBookByTitle,
    updateBookQuery,
    removeBookQuery,
    findBookById
}