const userController = require('../controllers/userController.js')

const router = require('express').Router()

router.post('/', userController.addUser)
router.get('/generate-otp', userController.generate_otp)
router.get('/verify-otp', userController.verify)
router.get('/hello', userController.hello)

module.exports = router