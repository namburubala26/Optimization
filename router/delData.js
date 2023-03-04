const express = require('express')
const router = express.Router()
const delController = require('../controllers/delData')
const userauthentication = require('../middleware/auth')

router.delete('/delData/:expenseid', userauthentication.authenticate, delController.delData)
module.exports = router