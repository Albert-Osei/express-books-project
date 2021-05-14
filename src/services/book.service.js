const { runQuery } = require('../config/database.config')
const { findBookByTitle, addBook: addBookQuery, removeBookQuery, updateBookQuery, getAllBooks, findBookById } = require('../queries/book')


const getBooks = async () => {

    const books = await runQuery(getAllBooks);
    return {
        status: 'success',
        code: 200,
        message: 'Books fetched successfully',
        data: books
    }
}

const addBook = async (body, user_id) => {
    const { title, author } = body

    const book = await runQuery(findBookByTitle, [title]);
    if(book.length > 0){
        throw { 
            status: 'error',
            message: 'Book already exists',
            code: 409,
            data: null
        }
    }

    const publishedAt = new Date();
    const response = await runQuery(addBookQuery, [title, author, publishedAt, user_id]);

    return {
        status: 'success',
        message: 'Book added successfully',
        code: 201,
        data: response[0]
    }
}

const updateBook = async(id, body) => {
    const { title, author } = body;

    const book = await runQuery(findBookById, [id]);
    
   if (book.length === 0) {
       throw{
           status: "error",
           message: "Book not found",
           code: 400,
           data: null
       };
   }
   const response = await runQuery(updateBookQuery, [title, author, id]);
   return {
       status: "success",
       message: "Book updated successfully",
       code: 200,
       data: response[0],
   };
}

const removeBook = async (id) => {
    const book = await runQuery(findBookById, [id]);
    if (book.length === 0) {
        books.splice(book, 1);
        throw {
            status: "error",
            message: "Book not found",
            code: 400,
            data: null
        };
    }
    const response = await runQuery(removeBookQuery, [id]);

    return {
        status: "success",
        message: "Book deleted successfully",
        code: 200,
        data: response[0]
    };
} 

module.exports = {
    getBooks,
    addBook,
    updateBook,
    removeBook

}