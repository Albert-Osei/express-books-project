const Joi = require('joi');

const {
    baseValidatorForBody,
} = require('./index');

const validateNewBook = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
    });
    baseValidatorForBody(schema, req, res, next);
};


module.exports = {
    validateNewBook
}