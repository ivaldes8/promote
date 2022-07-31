const express = require('express')
const {registerUser, loginUser, getMe, getUsers, updateCurrentUser, updateUser, deleteUser, createUser} = require('../controllers/userController')
const router = express.Router()
const {protect} = require('../middlewares/authMiddleware')
const {admin} = require('../middlewares/adminMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.route('/me').get(protect, getMe).put(protect, updateCurrentUser)
router.get('/all', admin, getUsers)
router.route('/:id').put(admin, updateUser).delete(admin, deleteUser)
router.post('/new', admin, createUser)

module.exports = router