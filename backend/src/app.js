import express from 'express'
import cors from 'cors'
import test from './routes/test.routes.js'
import employees from './routes/employees.routes.js'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api', test)
app.use('/api', employees)

app.listen(5000, () => console.log("Server running"))