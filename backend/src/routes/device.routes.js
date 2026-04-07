import express from 'express'
import prisma from '../config/prisma.js'
import crypto from 'crypto'

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

export default router