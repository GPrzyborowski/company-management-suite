import multer from 'multer'
import fs from 'fs'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const employeeId = req.params.id
        const dir = path.join(process.cwd(), 'uploads', 'employees', employeeId)
        fs.mkdirSync(dir, {recursive: true})
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        const safeOriginal = file.originalname.replace(/\s+/g, "_")
        cb(null, `${Date.now()}_${safeOriginal}`)
    }
})

export const uploadEmployeeDoc = multer({
    storage,
    limits: {fileSize: 10 * 1024 * 1024},
})