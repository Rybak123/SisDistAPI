const Joi = require('joi')

const id = Joi.string().uuid()
const name = Joi.string().min(3).max(30)
const age = Joi.number().integer().min(5).max(99)
const phone = Joi.string().min(7).max(14)
const image = Joi.string().uri()

const createStudentSchema = Joi.object({
    name: name.required(),
    age: age.required(),
    phone,
    image
})

const updateStudentSchema = Joi.object({
    name,
    age,
    phone,
    image
})

const getStudentSchema = Joi.object({
    id: id.required()
})

module.exports = {
    createStudentSchema,
    updateStudentSchema,
    getStudentSchema
}