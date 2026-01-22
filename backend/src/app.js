import express from 'express'
import cors from 'cors'
import employeesRoutes from './routes/employees.routes.js'
import authRoutes from './routes/auth.routes.js'
import employeeDocumentsRoutes from './routes/employeedocs.routes.js'
import loginCode from './routes/logincode.routes.js'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/employees', employeesRoutes)
app.use('/api', employeeDocumentsRoutes)
app.use('/api', loginCode)

app.listen(5000, () => console.log("Server running"))