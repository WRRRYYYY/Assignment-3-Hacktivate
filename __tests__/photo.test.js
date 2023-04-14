const request = require('supertest')
const app = require('../app')
const {
    User,
    Photo
} = require('../models')
const { generateToken } = require('../helpers/jwt')
let token
let dataUser
let dataPhoto2

describe('POST /photos', () => {
    beforeAll(async () => {
        try {
            dataUser = await User.create({
                username: "admin",
                email: "admin@gmail.com",
                password: "adminadmin",
            })

            token = generateToken({
                id: dataUser.id,
                username: dataUser.username,
                email: dataUser.email,
            })
            // console.log(token);
            // const dataPhoto = await Photo.create({
            //     title: "Photo 1",
            //     caption: "Capt Photo 1",
            //     image_url: "http://picsum.photos/id.3/200/300",
            //     UserId: data.id
            // })
        } catch (error) {
            console.log(error);
        }
    })

    it('Should be response 201', (done) => {
        request(app)
            .post('/photos/')
            .set({
                access_token: token
            })
            .send({
                title: "Photo 1",
                caption: "Capt Photo 1",
                image_url: "http://picsum.photos",
                UserId: dataUser.id
            })
            .expect(201)
            .end((err, res) => {
                if (err) {
                    done(err)
                }
                console.log(res.body);
                expect(res.body).toHaveProperty('id')
                expect(res.body).toHaveProperty('title')
                expect(res.body.title).toEqual('Photo 1')
                expect(res.body).toHaveProperty('caption')
                expect(res.body.caption).toEqual('Capt Photo 1')
                expect(res.body).toHaveProperty('image_url')
                expect(res.body.image_url).toEqual('http://picsum.photos')
                expect(res.body).toHaveProperty('UserId')
                expect(res.body.UserId).toEqual(dataUser.id)
                expect(res.body).toHaveProperty('updatedAt')
                expect(res.body).toHaveProperty('createdAt')
                done()
            })
    })

    it('Should be response 401', (done) => {
        request(app)
            .post('/photos/')
            .set({
                access_token: ""
            })
            .send({
                title: "Photo 1",
                caption: "Capt Photo 1",
                image_url: "http://picsum.photos",
                UserId: dataUser.id
            })
            .expect(401)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                console.log(res.body);

                expect(res.body).toHaveProperty('code')
                expect(res.body.code).toEqual(401)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Token not provided')
                // expect(res.body.username).toEqual('admin')
                done()
            })
    })

    afterAll(async () => {
        // Destroy Data Users
        try {
            await User.destroy({ where: {} })
            await Photo.destroy({ where: {} })

        } catch (error) {
            console.log(error);
        }
    })

})


// API get all photos
describe('GET /photos', () => {
    beforeAll(async () => {
        try {
            dataUser = await User.create({
                username: "admin",
                email: "admin@gmail.com",
                password: "adminadmin",
            })

            token = generateToken({
                id: dataUser.id,
                username: dataUser.username,
                email: dataUser.email,
            })

            // console.log(token);
            const dataPhoto = await Photo.create({
                title: "Photo 1",
                caption: "Capt Photo 1",
                image_url: "http://picsum.photos/id/3/200/300",
                UserId: dataUser.id
            })
        } catch (error) {
            console.log(error);
        }
    })

    it('Should be response 200', (done) => {
        request(app)
            .get('/photos/')
            .set({
                access_token: token
            })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err)
                }
                console.log(res.body[0]);
                expect(res.body[0]).toHaveProperty('id')
                expect(res.body[0]).toHaveProperty('title')
                expect(res.body[0].title).toEqual('Photo 1')
                expect(res.body[0]).toHaveProperty('caption')
                expect(res.body[0].caption).toEqual('Capt Photo 1')
                expect(res.body[0]).toHaveProperty('image_url')
                expect(res.body[0].image_url).toEqual('http://picsum.photos/id/3/200/300')
                expect(res.body[0]).toHaveProperty('UserId')
                expect(res.body[0].UserId).toEqual(dataUser.id)
                expect(res.body[0]).toHaveProperty('updatedAt')
                expect(res.body[0]).toHaveProperty('createdAt')
                expect(res.body[0].User).toHaveProperty('id')
                expect(res.body[0].User.id).toEqual(dataUser.id)
                expect(res.body[0].User).toHaveProperty('username')
                expect(res.body[0].User.username).toEqual(dataUser.username)
                expect(res.body[0].User).toHaveProperty('email')
                expect(res.body[0].User.email).toEqual(dataUser.email)
                done()
            })
    })

    it('Should be response 500', (done) => {
        request(app)
            .get('/photos/')
            .set({
                access_token: ""
            })
            .expect(401)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                console.log(res.body);

                expect(res.body).toHaveProperty('code')
                expect(res.body.code).toEqual(401)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Token not provided')
                done()
            })
    })

    afterAll(async () => {
        // Destroy Data Users
        try {
            await User.destroy({ where: {} })
            await Photo.destroy({ where: {} })

        } catch (error) {
            console.log(error);
        }
    })

})


// API get photos by id
describe('GET /photos/:id', () => {
    beforeAll(async () => {
        try {
            dataUser = await User.create({
                username: "admin",
                email: "admin@gmail.com",
                password: "adminadmin",
            })

            token = generateToken({
                id: dataUser.id,
                username: dataUser.username,
                email: dataUser.email,
            })

            // console.log(token);
            dataPhoto2 = await Photo.create({
                title: "Photo 1",
                caption: "Capt Photo 1",
                image_url: "http://picsum.photos/id/3/200/300",
                UserId: dataUser.id
            })
        } catch (error) {
            console.log(error);
        }
    })

    it('Should be response 200', (done) => {
        request(app)
            .get('/photos/' + dataPhoto2.id)
            .set({
                access_token: token
            })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err)
                }
                console.log(res.body);
                expect(res.body).toHaveProperty('id')
                expect(res.body).toHaveProperty('title')
                expect(res.body.title).toEqual('Photo 1')
                expect(res.body).toHaveProperty('caption')
                expect(res.body.caption).toEqual('Capt Photo 1')
                expect(res.body).toHaveProperty('image_url')
                expect(res.body.image_url).toEqual('http://picsum.photos/id/3/200/300')
                expect(res.body).toHaveProperty('UserId')
                expect(res.body.UserId).toEqual(dataUser.id)
                expect(res.body).toHaveProperty('updatedAt')
                expect(res.body).toHaveProperty('createdAt')

                done()
            })
    })

    it('Should be response 404', (done) => {
        request(app)
            .get('/photos/99')
            .set({
                access_token: token
            })
            .expect(404)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                console.log(res.body);

                expect(res.body).toHaveProperty('code')
                expect(res.body.code).toEqual(404)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Data not found!')
                done()
            })
    })

    afterAll(async () => {
        // Destroy Data Users
        try {
            await User.destroy({ where: {} })
            await Photo.destroy({ where: {} })

        } catch (error) {
            console.log(error);
        }
    })

})