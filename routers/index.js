const router = require('express').Router()
const photoRouters = require('./photoRouter')
const userRouters = require('./userRouter')
const authentication = require('../middlewares/authentication')

router.use('/users', userRouters)
router.use(authentication)
router.use('/photos', photoRouters)

module.exports = router