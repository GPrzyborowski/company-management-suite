import express from 'express'
import fs from 'fs'
import prisma from '../config/prisma.js'
import { auth } from '../middleware/auth.js'
import { uploadEmployeeDoc } from '../middleware/uploademployeedoc.js'

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

router.post('/employees/:id/documents', auth, uploadEmployeeDoc.single('file'), async (req, res) => {
    const employeeId = req.params.id
    const document = await prisma.employeedocument.create({
        data: {
            employeeId,
            fileName: req.file.originalname,
            storedName: req.file.filename,
            mimeType: req.file.mimetype,
            size: req.file.size,
            filePath: req.file.path
        },
        select: {
            id: true,
            fileName: true,
            uploadedAt: true,
            mimeType: true,
            size: true
        }
    })
    res.status(201).json(document)
})

export default router