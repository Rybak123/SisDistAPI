const express = require('express')
const faker = require('faker')

const router = express.Router()

router.get('/', (req, res) => {
    const { size } = req.query
    const courses = []
    limit = size || 50
    for (let index = 0; index < limit; index++) {
        courses.push({
            name: faker.name.title(),
            image: faker.image.business()
        })
    }
    res.json(courses)
})



module.exports = router