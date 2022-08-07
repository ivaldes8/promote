const express = require('express')
const router = express.Router()
const {getTemplate, createTemplate, updateTemplate, deleteTemplate} = require('../controllers/templateController')

const { protect, admin } = require('../middlewares/authMiddleware')

router.route('/').get(protect,getTemplate).post(admin,createTemplate)
router.route('/:id').put(admin, updateTemplate).delete(admin, deleteTemplate)

module.exports = router