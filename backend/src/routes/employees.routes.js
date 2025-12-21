import express from 'express'
import auth from '../middleware/auth.js'
import { getEmployees, getEmployeeById, updateEmployee } from '../../controllers/employees.controller.js'

const router = express.Router()

router.get('/', auth, getEmployees)
router.get('/:id', auth, getEmployeeById)
// router.put('/:id', auth, updateEmployee)

export default router