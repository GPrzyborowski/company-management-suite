import express from 'express'
import fs from 'fs'
import prisma from '../config/prisma.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.get('/employees/:id/documents', auth, async (req, res) => {
    const employeeId = req.params.id
    const documents = await prisma.employeedocument.findMany({
        where: {employeeId},
        orderBy: {uploadedAt: 'desc'},
        select: {
            id: true,
            fileName: true,
            uploadedAt: true,
            mimeType: true,
            size: true
        }
    })
    res.json(documents)
})