const express = require('express')
const router = express.Router()
const {getLanguages, createLanguage, updateLanguage, deleteLanguage} = require('../controllers/languageController')

const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(protect,getLanguages).post(protect,createLanguage)
router.route('/:id').put(protect, updateLanguage).delete(protect, deleteLanguage)

module.exports = router