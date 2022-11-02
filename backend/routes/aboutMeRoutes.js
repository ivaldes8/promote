const express = require('express')
const router = express.Router()
const {getAboutMes, createAboutMe, updateAboutMe, deleteAboutMe} = require('../controllers/aboutMeController')

const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(protect,getAboutMes).post(protect,createAboutMe)
router.route('/:id').put(protect, updateAboutMe).delete(protect, deleteAboutMe)

module.exports = router