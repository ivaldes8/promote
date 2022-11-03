const express = require('express')
const router = express.Router()
const {getDegrees, createDegree, updateDegree, deleteDegree} = require('../controllers/degreeController')

const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(protect,getDegrees).post(protect,createDegree)
router.route('/:id').put(protect, updateDegree).delete(protect, deleteDegree)

module.exports = router