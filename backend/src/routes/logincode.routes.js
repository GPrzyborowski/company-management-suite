import express from 'express'
import auth from '../middleware/auth.js'
import prisma from '../config/prisma.js'
import generateCode from '../../utils/generateCode.js'

const router = express.Router()
router.use(auth)

router.post('/logincode', async (req, res) => {
	const { employeeId, expiresInDays } = req.body
    const days = Number(expiresInDays)
    if(!days || days <= 0 || days > 30) {
        return res.status(400).json({message: 'Invalid expiration time.'})
    }
    const employee = await prisma.employee.findUnique({where: {id: employeeId}})
    if(!employee) {
        return res.status(404).json({message: "Employee does not exist."})
    }
    const {code, hash} = await generateCode()
    const MS_IN_DAY = 1000 * 60 * 60 * 24
    const expiresAt = new Date(Date.now() + days * MS_IN_DAY)
    await prisma.loginCode.create({
        data: {
            codeHash: hash,
            expiresAt,
            employeeId
        }
    })
    res.json({
        oneTimeCode: code,
        expiresAt
    })
})

export default router