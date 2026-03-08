import express from 'express'
import prisma from '../config/prisma.js'
import auth from '../middleware/auth.js'

const router = express.Router()
router.use(auth)

router.post('/newhost', async (req, res) => {
    const deviceName = req.body
})

export default router