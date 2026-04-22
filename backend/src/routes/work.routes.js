import express from 'express'
import prisma from '../config/prisma.js'

const router = express.Router()

router.post('/scan', async (req, res) => {
	try {
		const { token, type, deviceId, employeeId } = req.body

		const device = await prisma.hostDevice.findFirst({where: {
			deviceId: deviceId
		}})

		if(!device.isActive) {
			return res.status(400).json({message: 'The device is not activated.'})
		}

		const code = await prisma.deviceLoginCode.findFirst({
			where: {
				codeHash: token,
				deviceId,
			},
		})

		if (!code || code.expiresAt < new Date() || code.usedAt) {
			return res.status(400).json({ error: 'Invalid code' })
		}

		await prisma.deviceLoginCode.update({
			where: { id: code.id },
			data: { usedAt: new Date() },
		})

		if (type === 'start') {
			const existing = await prisma.workSession.findFirst({
				where: {
					employeeId,
					endedAt: null,
				},
			})

			if (existing) {
				return res.status(400).json({ error: 'Already working' })
			}

			await prisma.workSession.create({
				data: {
					employeeId,
					deviceId,
					startedAt: new Date(),
				},
			})
		}

		if (type === 'end') {
			const session = await prisma.workSession.findFirst({
				where: {
					employeeId,
					endedAt: null,
				},
			})

			if (!session) {
				return res.status(400).json({ error: 'No active session' })
			}

			await prisma.workSession.update({
				where: { id: session.id },
				data: {
					endedAt: new Date(),
				},
			})
		}

		res.json({ success: true })
	} catch (err) {
		console.error('Scan error:', err)
		res.status(500).json({ error: err.message })
	}
})

router.get('/data/:id', async (req, res) => {
	const id = Number(req.params.id)
	if (!id) {
		return res.status(404).json({ error: 'Employee ID was not provided.' })
	}
	const workData = await prisma.workSession.findMany({ where: {employeeId: id} })
	return res.status(200).json(workData)
})

export default router
