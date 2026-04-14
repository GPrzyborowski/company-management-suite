import express from 'express'
import prisma from '../config/prisma.js'
import crypto from 'crypto'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/generateQr', async (req, res) => {
	const { deviceId, type } = req.body
	const token = crypto.randomBytes(32).toString('hex')
	const expiresAt = new Date(Date.now() + 10 * 1000)

	const code = await prisma.deviceLoginCode.create({
		data: {
			deviceId,
			codeHash: token,
			expiresAt,
		},
	})

	res.json({
		qrData: {
			type,
			deviceId,
			token,
		},
	})
})

router.get('/qrStatus/:deviceId', auth, async (req, res) => {
	try {
		const deviceId = Number(req.params.deviceId)

		const code = await prisma.deviceLoginCode.findFirst({
			where: {
				deviceId,
				expiresAt: { gt: new Date() },
			},
			orderBy: { createdAt: 'desc' },
		})

		res.json({ scanned: !!code?.usedAt })
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

export default router
