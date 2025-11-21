import express from 'express'
import prisma from '../config/prisma.js'

const router = express.Router()

router.get('/employees', async (req, res) => {
    try {
        const employees = await prisma.employee.findMany()
        console.log(employees)
        res.json(employees)
    } catch(err) {
        res.status(500)
    }
})

export default router