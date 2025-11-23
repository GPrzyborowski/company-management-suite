import express from 'express'
import prisma from '../config/prisma.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/employees', auth, async (req, res) => {
    try {
        const employees = await prisma.employee.findMany()
        res.json(employees)
    } catch(err) {
        res.status(500)
    }
})

export default router