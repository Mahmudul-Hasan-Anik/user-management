const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./server/routes/userRoutes')
const AuthRouter = require('./server/routes/AuthRoutes')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(()=>{
  console.log('Database Connected')
})

// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use('/', userRouter)
app.use('/auth', AuthRouter)


app.get('/', function (req, res) {
  res.send('index')
})

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})