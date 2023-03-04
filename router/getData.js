const express = require('express')
const userauthentication = require('../middleware/auth')
const router = express.Router()
const formController = require('../controllers/getData')


router.get('/getData',userauthentication.authenticate , formController.getData)
module.exports = router