const express = require('express')
const router = express.Router()
const {getLetters, createLetter, updateLetter, deleteLetter} = require('../controllers/letterController')

const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(protect,getLetters).post(protect,createLetter)
router.route('/:id').put(protect, updateLetter).delete(protect, deleteLetter)

module.exports = router