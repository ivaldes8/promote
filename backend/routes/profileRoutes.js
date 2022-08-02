const express = require('express')
const router = express.Router()
const {getProfile, createProfile, updateProfile, deleteProfile} = require('../controllers/profileController')

const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(protect,getProfile).post(protect,createProfile)
router.route('/:id').put(protect, updateProfile).delete(protect, deleteProfile)

module.exports = router