import express from 'express'
import cors from 'cors'
import employeesRoutes from './routes/employees.routes.js'
import authRoutes from './routes/auth.routes.js'
import employeeDocumentsRoutes from './routes/employeedocs.routes.js'
import loginCode from './routes/logincode.routes.js'
import hosts from './routes/hosts.routes.js'
import device from './routes/device.routes.js'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/employees', employeesRoutes)
app.use('/api', employeeDocumentsRoutes)
app.use('/api', loginCode)
app.use('/api/hosts', hosts)
app.use('/api/device', device)

app.get('/health', (req, res) => {
    res.json({message: "Server OK"})
})

app.listen(5000, () => console.log("Server running"))