const express = require('express')
const router = express.Router()
const {getHome, createHome, updateHome, deleteHome} = require('../controllers/homeController')

const { admin } = require('../middlewares/adminMiddleware')

router.route('/').get(getHome).post(admin,createHome)
router.route('/:id').put(admin, updateHome).delete(admin, deleteHome)

module.exports = router