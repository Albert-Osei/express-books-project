const BookService = require('../services/book.service')

const getBooks = async (req, res, next) => {
    try{
        const response = await BookService.getBooks();
        return res.status(response.code).json(response);
    }catch(error){
        next(error)
    }  
}


const addBook = async (req, res, next) => {
    const { id } = req.decoded
    try {
        const response = await BookService.addBook(req.body, id);
        return res.status(response.code).json(response);
    }catch(err){
        next(err)
    }
}


const updateBook = async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = await BookService.updateBook(id, req.body)
        return res.status(response.code).json(response);
    }catch (error) {
        next(error)
    }
}


const removeBook = async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = await BookService.removeBook(id)
        return res.status(response.code).json(response);
    } catch (error) {
        next(error)
    }   
}


module.exports = {
    getBooks,
    addBook,
    updateBook,
    removeBook
}