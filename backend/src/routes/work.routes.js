import express from 'express'
import prisma from '../config/prisma.js'

const router = express.Router()

router.post('/scan', async (req, res) => {
	const { token, type, deviceId, employeeId } = req.body

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

	if (type === 'START') {
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

	if (type === 'END') {
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
})

export default router