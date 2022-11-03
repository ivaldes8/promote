const express = require('express')
const router = express.Router()
const {getProjects, createProject, updateProject, deleteProject} = require('../controllers/projectController')

const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(protect,getProjects).post(protect,createProject)
router.route('/:id').put(protect, updateProject).delete(protect, deleteProject)

module.exports = router