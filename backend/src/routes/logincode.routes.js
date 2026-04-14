import express from 'express'
import auth from '../middleware/auth.js'
import prisma from '../config/prisma.js'
import generateCode from '../../utils/generateCode.js'

const router = express.Router()

router.post('/logincode', auth, async (req, res) => {
	const { employeeId, expiresInDays } = req.body
	const employeeIdNumber = Number(employeeId)
	const days = Number(expiresInDays)
	if (!days || days <= 0 || days > 30) {
		return res.status(400).json({ message: 'Invalid expiration time.' })
	}
	const employee = await prisma.employee.findUnique({ where: { id: employeeIdNumber } })
	if (!employee) {
		return res.status(404).json({ message: 'Employee does not exist.' })
	}
	const { code, hash } = await generateCode()
	const MS_IN_DAY = 1000 * 60 * 60 * 24
	const expiresAt = new Date(Date.now() + days * MS_IN_DAY)
	await prisma.loginCode.create({
		data: {
			codeHash: hash,
			expiresAt,
			employeeId: employeeIdNumber,
		},
	})
	res.json({
		oneTimeCode: code,
		expiresAt,
	})
})

router.post('/devicelogincode', auth, async (req, res) => {
	const { deviceId, expiresInDays } = req.body
	const deviceIdNumber = Number(deviceId)
	const days = Number(expiresInDays)
	if (!days || days <= 0 || days > 30) {
		return res.status(400).json({ message: 'Invalid expiration time.' })
	}
	const device = await prisma.hostDevice.findUnique({ where: { id: deviceIdNumber } })
	if (!device) {
		return res.status(404).json({ message: 'Device does not exist.' })
	}
	const { code, hash } = await generateCode()
	const MS_IN_DAY = 1000 * 60 * 60 * 24
	const expiresAt = new Date(Date.now() + days * MS_IN_DAY)
	await prisma.deviceLoginCode.create({
		data: {
			codeHash: hash,
			expiresAt,
			deviceId: deviceIdNumber,
		},
	})
	res.json({
		oneTimeCode: code,
		expiresAt,
	})
})

export default router
