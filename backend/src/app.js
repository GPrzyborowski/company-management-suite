import express from 'express'
import cors from 'cors'
import testRoutes from './routes/test.routes.js'
import employeesRoutes from './routes/employees.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api', testRoutes)
app.use('/api', employeesRoutes)

app.listen(5000, () => console.log("Server running"))