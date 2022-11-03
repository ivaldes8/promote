const express = require('express')
const router = express.Router()
const {getInfos, createInfo, updateInfo, deleteInfo} = require('../controllers/infoController')

const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(protect,getInfos).post(protect,createInfo)
router.route('/:id').put(protect, updateInfo).delete(protect, deleteInfo)

module.exports = router