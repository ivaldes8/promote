const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json({limit: "5mb", extended: true}))
app.use(express.urlencoded({limit: "5mb", extended: true}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/profile', require('./routes/profileRoutes'))
app.use('/api/skill', require('./routes/skillRoutes'))
app.use('/api/about', require('./routes/aboutMeRoutes'))
app.use('/api/template', require('./routes/templateRoutes'))
app.use('/api/cv', require('./routes/cvRoutes'))
app.use('/api/home', require('./routes/homeRoutes'))
app.use('/api/homeCards', require('./routes/homeCardRoutes'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/dist/pwa')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'dist', 'pwa', 'index.html' )))
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))