const Joi = require('joi')

exports.createCategoryValidateSchema = Joi.object({
    title: Joi.string().required()
})