const Joi = require('joi')

exports.postCreateSchema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(10).required(),
    user_id: Joi.string().required(),
    category_id: Joi.string().required()
});