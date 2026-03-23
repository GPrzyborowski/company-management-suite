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

router.patch('/togglehost/:id', async (req, res) => {
	const id = parseInt(req.params.id)
	const host = await prisma.hostDevice.findUnique({
		where: { id },
	})
	if (!host) {
		return res.status(404).json({ error: 'Host not found' })
	}
	const updatedHost = await prisma.hostDevice.update({
		where: { id },
		data: {
			isActive: !host.isActive,
		},
	})
	res.json(updatedHost)
})

router.delete('/:id', async (req, res) => {
	try {
		const id = Number(req.params.id)
		const device = await prisma.hostDevice.findUnique({ where: { id: id } })
		if (!device) {
			return res.status(404).json({ message: 'Device not found.' })
		}
		await prisma.hostDevice.delete({ where: { id: id } })
		res.sendStatus(204)
	} catch {
		res.status(500).json({ message: 'Server error.' })
	}
})

export default router
