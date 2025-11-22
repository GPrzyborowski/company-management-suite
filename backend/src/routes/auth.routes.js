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
        console.log("Auth endpoint works")
        res.send("Registered successfully.")
    } catch(err) {
        console.error(err)
        res.status(400).json({error: "Registration failed."})
    }
})

export default router