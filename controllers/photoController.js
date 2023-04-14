
const {
    Photo,
    User
} = require('../models')
const user = require('../models/user')

class PhotoController {
    static async getPhotos(req, res) {
        try {
            const { id } = req.UserData

            const data = await Photo.findAll({
                where: {
                    UserId: id
                },
                include: {
                    model: User
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(error?.code || 500).json(error)

        }
    }

    static async getPhotoById(req, res) {
        try {
            const { id } = req.params
            const { id: userId } = req.UserData

            const data = await Photo.findOne({
                where: {
                    id
                }
            })

            if (!data) {
                throw {
                    code: 404,
                    message: "Data not found!"
                }
            }

            if (data.UserId !== userId) {
                throw {
                    code: 403,
                    message: "Forbidden"
                }
            }

            res.status(200).json(data)
        } catch (error) {
            res.status(error?.code || 500).json(error)

        }
    }

    static async createPhoto(req, res) {
        try {
            const {
                title,
                caption,
                image_url: image_url
            } = req.body

            const { id } = req.UserData

            const result = await Photo.create({
                title,
                caption,
                image_url,
                UserId: id
            })

            res.status(201).json(result)
        } catch (error) {
            res.status(error?.code || 500).json(error)

        }
    }

    static async updatePhotoById(req, res) {
        try {
            const { id } = req.params
            const {
                title,
                caption,
                image_url
            } = req.body

            const result = await Photo.update({
                title,
                caption,
                image_url
            }, {
                where: {
                    id
                },
                returning: true
            })

            res.status(201).json(result)
        } catch (error) {
            res.status(error?.code || 500).json(error)

        }
    }

    static async deletePhotoById(req, res) {
        try {
            const { id } = req.params

            const result = await Photo.destroy({
                where: {
                    id
                }
            })

            if (!result) {
                throw {
                    code: 404,
                    message: "Data not found!"
                }
            }

            res.status(201).json(result)
        } catch (error) {
            res.status(error?.code || 500).json(error)

        }
    }
}

module.exports = PhotoController