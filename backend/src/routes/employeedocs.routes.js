import express from 'express'
import fs from 'fs'
import prisma from '../config/prisma.js'
import auth from '../middleware/auth.js'
import { uploadEmployeeDoc } from '../middleware/upload.js'

const router = express.Router()

router.get('/employees/:id/documents', auth, async (req, res) => {
	try {
		const employeeId = Number(req.params.id)
		const documents = await prisma.employeeDocument.findMany({
			where: { employeeId },
			orderBy: { uploadedAt: 'desc' },
			select: {
				id: true,
				fileName: true,
				uploadedAt: true,
				mimeType: true,
				size: true,
			},
		})
		res.json(documents)
	} catch (err) {
		return res.status(500).json({ message: 'Server error.' })
	}
})

router.post('/employees/:id/documents', auth, uploadEmployeeDoc.single('file'), async (req, res) => {
	try {
		const employeeId = Number(req.params.id)
		const document = await prisma.employeeDocument.create({
			data: {
				employeeId,
				fileName: req.file.originalname,
				storedName: req.file.filename,
				mimeType: req.file.mimetype,
				size: req.file.size,
				filePath: req.file.path,
			},
			select: {
				id: true,
				fileName: true,
				uploadedAt: true,
				mimeType: true,
				size: true,
			},
		})
		return res.status(201).json(document)
	} catch (err) {
		return res.status(500).json({ message: 'Server error.' })
	}
})

router.get('/documents/:documentId/download', auth, async (req, res) => {
	try {
		const documentId = Number(req.params.documentId)
		const document = await prisma.employeeDocument.findUnique({ where: { id: documentId } })
		if (!document) {
			return res.status(404)
		}
		return res.download(document.filePath, document.fileName)
	} catch (err) {
		return res.status(500).json({ message: 'Server error.' })
	}
})

router.delete('/documents/:documentId', auth, async (req, res) => {
	try {
		const documentId = Number(req.params.documentId)
		const document = await prisma.employeeDocument.findUnique({ where: { id: documentId } })
		if (!document) {
			return res.status(404)
		}
		try {
			fs.unlinkSync(document.filePath)
		} catch (error) {
			console.error(error)
		}
		await prisma.employeeDocument.delete({ where: { id: documentId } })
		return res.sendStatus(204)
	} catch (err) {
		return res.status(500).json({message: "Server error."})
	}
})

export default router
