const express = require('express')
const faker = require('faker')

const router = express.Router()


router.get('/', (req, res) => {
    const { size } = req.query
    const teachers = []
    limit = size || 50
    for (let index = 0; index < limit; index++) {
        teachers.push({
            name: faker.name.lastName(),
            image: faker.image.avatar(),
            email: faker.internet.email()
        })
    }
    res.json(teachers)
})



module.exports = router