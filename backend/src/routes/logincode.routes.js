import express from 'express'
import auth from '../middleware/auth.js'
import prisma from '../config/prisma.js'
import generateLoginCode from '../../utils/generateLoginCode.js'

const router = express.Router()
router.use(auth)

router.post('/logincode', async (req, res) => {
	const { employeeId, expiresInMinutes } = req.body
    const employee = await prisma.employee.findUnique({where: {id: employeeId}})
    if(!employee) {
        return res.status(404).json({message: "Employee does not exist."})
    }
    const {code, hash} = await generateLoginCode()
    const expiresAt = new Date(Date.now() + expiresInMinutes * 60  * 1000)
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