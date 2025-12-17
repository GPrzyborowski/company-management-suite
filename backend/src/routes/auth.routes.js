import express from 'express'
import { Prisma } from '@prisma/client'
import prisma from '../config/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/registeradmin', async (req, res) => {
	const { login, password, phone } = req.body
	try {
		const userExists = await prisma.admin.findUnique({ where: { login: login } })

		if (userExists) {
			return res.status(400).json({ error: 'User already exists.' })
		}

		const userPhoneExists = await prisma.admin.findUnique({ where: { phoneNumber: phone } })

		if (userPhoneExists) {
			return res.status(400).json({ error: 'User with the provided phone number already exists.' })
		}

		const phoneNumberAllowed = await prisma.allowedPhones.findUnique({ where: { number: phone } })

		if (!phoneNumberAllowed) {
			return res.status(400).json({ error: 'Provided phone number is not allowed.' })
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		const user = await prisma.admin.create({
			data: {
				login: login,
				password: hashedPassword,
				phoneNumber: phone,
			},
		})
		res.send('Registered successfully.')
	} catch (err) {
		console.error(err)
		res.status(400).json({ error: 'Registration failed.' })
	}
})

router.post('/registeremployee', async (req, res) => {
	const {
		firstName,
		lastName,
		birthDate,
		jobStartDate,
		email,
		phone,
		socialSecurity,
		address,
		bankNumber,
		salaryRate,
		contractType,
		role,
	} = req.body
	try {
		const userExists = await prisma.employee.findFirst({ where: { socialNumber: socialSecurity } })

		if (userExists) {
			return res.status(400).json({ error: 'User already exists.' })
		}

		const user = await prisma.employee.create({
			data: {
				firstName: firstName,
				lastName: lastName,
				birthDate: new Date(birthDate),
				jobStart: new Date(jobStartDate),
				email: email,
				phoneNumber: phone,
				socialNumber: socialSecurity,
				bankAccount: bankNumber,
				salaryRate: new Prisma.Decimal(salaryRate),
				contractType: contractType,
				position: role,
				address: {
					create: {
						country: address.country || 'Poland',
						city: address.city,
						postalCode: address.postalCode,
						street: address.street,
						buildingNumber: address.buildingNumber,
						apartmentNumber: address.apartmentNumber,
					},
				},
			},
		})
		res.json({ message: 'Employee registered successfully.' })
	} catch (err) {
		console.error(err)
		res.status(400).json({
			error: 'Registration failed.',
			details: err.message,
			code: err.code,
		})
	}
})

router.post('/login', async (req, res) => {
	const { login, password } = req.body

	const user = await prisma.admin.findUnique({ where: { login: login } })
	if (!user) {
		return res.status(400).json({ error: 'Invalid login or password.' })
	}
	const valid = await bcrypt.compare(password, user.password)
	if (!valid) {
		return res.status(400).json({ error: 'Invalid login or password.' })
	}
	const jwtToken = jwt.sign({ id: user.id, login: user.login }, process.env.JWT_SECRET, { expiresIn: '45m' })
	res.json({ jwtToken })
})

export default router
