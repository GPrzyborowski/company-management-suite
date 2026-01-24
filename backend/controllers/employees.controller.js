import prisma from '../src/config/prisma.js'

export const getEmployees = async (req, res) => {
	try {
		const employees = await prisma.employee.findMany()
		res.json(employees)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Error.' })
	}
}

export const getEmployeeById = async (req, res) => {
	const id = Number(req.params.id)
	const employee = await prisma.employee.findUnique({
		where: { id },
		include: {
			address: true,
		},
	})

	if (!employee) {
		return res.status(404).json({ message: 'User not found.' })
	}
	res.json(employee)
}

export const updateEmployee = async (req, res) => {
	try {
		const id = Number(req.params.id)
		const { address, birthDate, jobStartDate, ...rest } = req.body

		const employee = await prisma.employee.update({
			where: { id },
			data: {
				...rest,
				birthDate: birthDate ? new Date(birthDate) : undefined,
				jobStart: jobStartDate ? new Date(jobStartDate) : undefined,
				address: {
					upsert: {
						update: address,
						create: address,
					},
				},
			},
			include: {
				address: true,
			},
		})
		res.json(employee)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Update failed.' })
	}
}

export const removeEmployee = async (req, res) => {
		try {
			const id = Number(req.params.id)
			const employee = await prisma.employee.findUnique({ where: { id: id } })
			if (!employee) {
				return res.status(404).json({message: "Employee not found."})
			}
			await prisma.employee.delete({ where: { id: id } })
			res.sendStatus(204)
		} catch(err) {
			console.error(err)
			res.status(500).json({message: "Server error."})
		}
}
