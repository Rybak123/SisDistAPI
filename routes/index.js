const express = require('express')
const swaggerUI= require('swagger-ui-express')

const students = require('./students')
const teachers = require('./teachers')
const courses = require('./courses')
const orders = require('./orders')
const stocks = require('./stocks')
const items = require('./items')
const billing = require('./billing')
const category = require('./category')
const brand = require('./brand')
const size = require('./size')
function routerApi(app) {
    const router= express.Router()
    app.use('/univalle/v1', router)

    const swaggerDoc=require('../swagger.json')
    app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDoc))

    router.use('/students', students)
    router.use('/teachers', teachers)
    router.use('/courses', courses)
    router.use('/orders', orders)
    router.use('/stocks', stocks)
    router.use('/items', items)
    router.use('/billing', billing)
    router.use('/category', category)
    router.use('/brand', brand)
    router.use('/sizes', size)
}

module.exports = routerApi