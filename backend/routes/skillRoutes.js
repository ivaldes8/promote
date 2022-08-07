const express = require('express')
const router = express.Router()
const {getSkill, getAvaliableSkill, getSkillByUser, createSkill, updateSkill, deleteSkill} = require('../controllers/skillController')

const { admin, protect } = require('../middlewares/authMiddleware')

router.route('/').get(getSkill).post(protect,createSkill)
router.route('/avaliable').get(protect,getAvaliableSkill)
router.route('/me').get(protect,getSkillByUser)
router.route('/:id').put(protect, updateSkill).delete(protect, deleteSkill)

module.exports = router