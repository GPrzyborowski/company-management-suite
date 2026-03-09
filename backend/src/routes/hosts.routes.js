import express from 'express'
import prisma from '../config/prisma.js'
import auth from '../middleware/auth.js'

const router = express.Router()
router.use(auth)

router.get('/gethosts', auth, async (req, res) => {
	try {
		const hosts = await prisma.hostDevice.findMany()
		res.json(hosts)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Error.' })
	}
})

router.post('/newhost', auth, async (req, res) => {
	const { deviceName } = req.body
	const adminId = req.user.id
	const device = await prisma.hostDevice.create({
		data: {
			deviceName,
			createdById: adminId,
		},
	})
	res.json(device)
})

export default router
