const express = require('express')
const router = express.Router()
const {getCV, getPublicCV, createCV, updateCV, deleteCV} = require('../controllers/cvController')

const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(getPublicCV).post(protect,createCV)
router.route('/all').get(protect,getCV)
router.route('/:id').put(protect, updateCV).delete(protect, deleteCV)

module.exports = router