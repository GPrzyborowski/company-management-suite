import express from 'express'
import prisma from '../config/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/register', async (req, res) => {
    const {login, password} = req.body
    try {
        const userExists = await prisma.user.findUnique({where: {login: login}})

        if(userExists) {
            return res.status(400).json({error: "User already exists."})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                login: login, 
                password: hashedPassword
            }
        })
        res.send("Registered successfully.")
    } catch(err) {
        console.error(err)
        res.status(400).json({error: "Registration failed."})
    }
})

router.post('/login', async (req, res) => {
    const {login, password} = req.body

        const user = await prisma.user.findUnique({where: {login: login}})
        if(!user) {
            res.status(400).json({error: "Invalid login or password."})
        }
        const valid = await bcrypt.compare(password, user.password)
        if(!valid) {
            res.status(400).json({error: "Invalid login or password."})
        }
        const jwtToken = jwt.sign(
            {id: user.id, login: user.login},
            process.env.JWT_SECRET,
            {expiresIn: "15m"}
        )
        res.json({jwtToken})
})

export default router