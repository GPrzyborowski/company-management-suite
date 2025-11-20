import express from 'express'
import cors from 'cors'
import router from './routes/test.routes.js'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api', router)

app.listen(5000, () => console.log("Server running"))