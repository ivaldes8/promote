const express = require('express')
const router = express.Router()
const {getSkills, createSkill, updateSkill, deleteSkill} = require('../controllers/skillController')

const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(protect,getSkills).post(protect,createSkill)
router.route('/:id').put(protect, updateSkill).delete(protect, deleteSkill)

module.exports = router