const request = require('supertest')
const app = require('../app')
const {
    User
} = require('../models')

// Test API register
describe('POST /users/register', () => {
    afterAll(async () => {
        // Destroy Data Users
        try {
            await User.destroy({ where: {} })
        } catch (error) {
            console.log(error);
        }
    })


    // Success Test
    it('Should be response 201', (done) => {
        request(app)
            .post('/users/register')
            .send({
                username: "admin",
                email: "admin@gmail.com",
                password: "adminadmin"
            })
            .expect(201)
            .end((err, res) => {
                if (err) {
                    done(err)
                }
                expect(res.body).toHaveProperty('id')
                expect(res.body).toHaveProperty('username')
                expect(res.body.username).toEqual('admin')
                done()
            })
    })

    // Error response
    it('Should be response 500', (done) => {
        request(app)
            .post('/users/register')
            .send({
                username: "admin",
                email: "admin@gmail.com",
                password: "adminadmin"
            })
            .expect(500)
            .end((err, res) => {
                if (err) done(err)

                done()
            })
    })
})

// Test API login
describe("POST /users/login", () => {
    beforeAll(async () => {
        try {
            await User.create({
                username: "admin",
                email: "admin@gmail.com",
                password: "adminadmin"
            })
        } catch (error) {
            console.log(error);
        }
    })

    afterAll(async () => {
        // Destroy Data Users
        try {
            await User.destroy({ where: {} })
        } catch (error) {
            console.log(error);
        }
    })

    it('Should response 200', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: "admin@gmail.com",
                password: "adminadmin"
            })
            .expect(200)
            .end((err, res) => {
                if (err) done(err)

                expect(res.body).toHaveProperty("access_token")
                done()
            })
    })
})