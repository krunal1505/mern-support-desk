const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000

const app = express()

// Add Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Defining Routes
const userRoutes = require('./routes/userRoutes')

app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to Support-Desk API'})
})

// Routes
app.use('/api/users', userRoutes)

app.listen(PORT, () => {
    console.log(`Server started on Port :${PORT}`)
})