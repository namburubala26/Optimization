const express = require('express')
const router = express.Router()

const editController = require('../controllers/editData')

router.put('/editData/:id',editController.editData)

module.exports = router