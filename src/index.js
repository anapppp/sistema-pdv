const express = require('express')
const cors = require('cors')
const rotas = require('./rotas')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use(rotas)
app.listen(port)