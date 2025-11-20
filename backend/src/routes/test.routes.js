import express from 'express'

const router = express.Router()

router.get("/test", (req, res) => {
    res.send("Hello from server, backend running properly.")
})

export default router