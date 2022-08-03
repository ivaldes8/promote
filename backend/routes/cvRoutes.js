const express = require('express')
const router = express.Router()
const {getCV, createCV, updateCV, deleteCV} = require('../controllers/cvController')

const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(getCV).post(protect,createCV)
router.route('/:id').put(protect, updateCV).delete(protect, deleteCV)

module.exports = router