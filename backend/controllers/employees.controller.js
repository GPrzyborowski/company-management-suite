import prisma from '../src/config/prisma.js'

export const getEmployees = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany()
        res.json(employees)
    } catch(err) {
        console.error(err)
        res.status(500).json({message: 'Error.'})
    }
}

export const getEmployeeById = async (req, res) => {
    const id = Number(req.params.id)
    const employee = await prisma.employee.findUnique({
        where: {id},
        include: {
            address: true
        }
    })
    
    if(!employee) {
        return res.status(404).json({message: 'User not found.'})
    }
    res.json(employee)
}

export const updateEmployee = async (req, res) => {
    const id = Number(req.params.id)
    const employee = await prisma.employee.update({
        where: {id},
        data: req.body
    })
    res.json(employee)
}