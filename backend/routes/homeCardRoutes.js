const express = require('express')
const router = express.Router()
const {getHomeCards, createHomeCard, updateHomeCard, deleteHomeCard} = require('../controllers/homeCardController')

const { admin } = require('../middlewares/authMiddleware')

router.route('/').get(admin,getHomeCards).post(admin,createHomeCard)
router.route('/:id').put(admin, updateHomeCard).delete(admin, deleteHomeCard)

module.exports = router