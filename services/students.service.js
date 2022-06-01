const faker = require('faker')
const boom = require('@hapi/boom')

class StudentsService {
    constructor() {
        this.students = []
        this.generate()
    }
    generate() {
        const limit = 50
        for (let index = 0; index < limit; index++) {
            this.students.push({
                id: faker.datatype.uuid(),
                name: faker.name.firstName(),
                age: parseInt(faker.random.number(99)),
                phone: faker.phone.phoneNumber(),
                image: faker.image.avatar()
            })
        }
    }
    async create(data) {
        const newStudent = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.students.push(newStudent)
        return newStudent
    }
    async find() {
        return this.students
    }
    async findone(id) {
        const student = this.students.find(item => item.id === id)
        // const student= this.getall()
        if (!student) {
            throw boom.notFound('Student not found')
            
        }
        return student
    }
    async update(id, changes) {
        const index = this.students.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('Student not found')
        }
        const student = this.students[index]

        this.students[index] = {
            ...student,
            ...changes
        }
        return this.students[index]
    }
    async delete(id) {
        const index = this.students.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('Student not found')
        }
        this.students.splice(index, 1)
        return {
            messge: 'deleted',
            id
        }
    }
}

module.exports = StudentsService


