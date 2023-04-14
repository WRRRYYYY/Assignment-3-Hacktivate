const router = require('express').Router()
const PhotoController = require('../controllers/photoController')

router.get("/", PhotoController.getPhotos)
router.get("/:id", PhotoController.getPhotoById)
router.post("/", PhotoController.createPhoto)
router.put('/:id', PhotoController.updatePhotoById)
router.delete('/:id', PhotoController.deletePhotoById)

module.exports = router