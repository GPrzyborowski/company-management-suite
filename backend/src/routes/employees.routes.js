import express from 'express'
import auth from '../middleware/auth.js'
import { getEmployees, getEmployeeById, updateEmployee, removeEmployee } from '../../controllers/employees.controller.js'

const router = express.Router()

router.get('/', auth, getEmployees)
router.get('/:id', auth, getEmployeeById)
router.put('/:id', auth, updateEmployee)
router.delete('/:id', auth, removeEmployee)

export default router