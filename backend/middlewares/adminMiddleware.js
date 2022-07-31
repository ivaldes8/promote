const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const admin = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
            if (req.user.role !== 'Admin') {
                res.status(403)
                throw new Error('Not allowed')
            }
            next()
        } catch (error) {
            res.status(403)
            throw new Error('Not allowed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { admin }