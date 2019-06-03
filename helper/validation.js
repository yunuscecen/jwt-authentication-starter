const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = {
        name : Joi.string().min(3).max(60).required(),
        email : Joi.string().trim().min(6).required().email(),
        password : Joi.string().min(6).required()
    }
    return Joi.validate(data,schema);
};

const loginValidation = (data) => {
    const schema = {
        email : Joi.string().trim().min(6).required().email(),
        password : Joi.string().min(6).required()
    }
    return Joi.validate(data,schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;