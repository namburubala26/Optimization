const express = require('express')
const formController = require('../controllers/data')
const userauthentication = require('../middleware/auth')
const router = express.Router()

router.post('/post',userauthentication.authenticate,formController.postData)
module.exports = router