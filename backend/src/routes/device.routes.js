import express from 'express'
import prisma from '../config/prisma.js'
import crypto from 'crypto'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/generateQr', async (req, res) => {
	const { deviceId, type } = req.body
	const token = crypto.randomBytes(32).toString('hex')
	const expiresAt = new Date(Date.now() + 4 * 1000)

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
			codeId: code.id
		},
	})
})

router.get('/qrStatus/:codeId', auth, async (req, res) => {
    try {
        const codeId = Number(req.params.codeId)
        const code = await prisma.deviceLoginCode.findUnique({
            where: { id: codeId },
        })
        res.json({ scanned: !!code?.usedAt })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router
