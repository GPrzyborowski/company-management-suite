import EmployeeDoc from './EmployeeDoc'
import NewDocument from './NewDocument'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import classes from './Employee.module.css'

function Employee() {
	const { id } = useParams()

	const [employee, setEmployee] = useState('')
	const [documents, setDocuments] = useState([])

	const employeeEndpoint = `http://localhost:5000/api/employees/${id}`
	const documentsEndpoint = `http://localhost:5000/api/employees/${id}/documents`

	useEffect(() => {
		fetch(employeeEndpoint, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then(res => res.json())
			.then(data => {
				setEmployee(data)
			})
	}, [id])

	const loadDocuments = async () => {
		fetch(documentsEndpoint, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then(res => res.json())
			.then(data => setDocuments(data))
	}

	useEffect(() => {
		loadDocuments()
	}, [id])

	const birthDate = new Date(employee.birthDate)
	const birthDateFormatted = birthDate.toLocaleDateString('pl-PL', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})

	const jobStart = new Date(employee.jobStart)
	const jobStartFormatted = jobStart.toLocaleDateString('pl-PL', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})

	const downloadFile = async (id, fileName) => {
		const res = await fetch(`http://localhost:5000/api/documents/${id}/download`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		if (!res.ok) {
			console.error('Downloading the file resulted in failure.')
			return
		}
		const blob = await res.blob()
		const url = window.URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = fileName
		document.body.appendChild(a)
		a.click()
		a.remove()
		window.URL.revokeObjectURL(url)
	}

	const deleteFile = async id => {
		const confirmed = window.confirm("Are you sure you want to delete this file?")
		if(!confirmed) {
			return
		}
		const res = await fetch(`http://localhost:5000/api/documents/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		if (res.ok) {
			loadDocuments()
		}
	}

	return (
		<main className={classes.main}>
			<div className={classes.box}>
				<div className={classes['info-box']}>
					<h2 className={classes['info-header']}>
						Employee: {employee.firstName} {employee.lastName}
					</h2>
					<p className={classes.info}>
						<span className={classes['info-label']}>Name:</span> {employee.firstName} {employee.lastName}
					</p>
					<p className={classes.info}>
						<span className={classes['info-label']}>Birth date: </span>
						{birthDateFormatted}
					</p>
					<p className={classes.info}>
						<span className={classes['info-label']}>Social number: </span>
						{employee.socialNumber}
					</p>
					<p className={classes.info}>
						<span className={classes['info-label']}>Phone number: </span>
						{employee.phoneNumber}
					</p>
					<p className={classes.info}>
						<span className={classes['info-label']}>Email: </span>
						{employee.email}
					</p>
					<p className={classes.info}>
						<span className={classes['info-label']}>Bank account: </span>
						{employee.bankAccount}
					</p>
					<p className={classes.info}>
						<span className={classes['info-label']}>Registered: </span>
						{jobStartFormatted}
					</p>
					<p className={classes.info}>
						<span className={classes['info-label']}>Salary rate: </span>
						{employee.salaryRate}pln / hour
					</p>
					<p className={classes.info}>
						<span className={classes['info-label']}>Position: </span>
						{employee.position}
					</p>
					<p className={classes.info}>
						<span className={classes['info-label']}>Contract type: </span>
						{employee.contractType}
					</p>
					<p className={classes.info}>
						<span className={classes['info-label']}>Country: </span>
						{employee?.address?.country}
					</p>
					<p className={classes.info}>
						<span className={classes['info-label']}>City: </span>
						{employee?.address?.city}
					</p>
					<p className={classes.info}>
						<span className={classes['info-label']}>Street: </span>
						{employee?.address?.street} {employee?.address?.buildingNumber} / {employee?.address?.apartmentNumber}
					</p>
					<p className={classes.info}>
						<span className={classes['info-label']}>Postal code: </span>
						{employee?.address?.postalCode}
					</p>
				</div>
				<div className={classes['docs-box']}>
					<h2 className={`${classes['info-header']} ${classes['docs-header']}`}>Documents</h2>
					<div className={classes['docs-container']}>
						{documents.map(element => {
							const documentDate = new Date(element.uploadedAt)
							const documentDateFormatted = documentDate.toLocaleDateString('pl-PL', {
								day: 'numeric',
								month: 'numeric',
								year: 'numeric',
							})
							return (
								<EmployeeDoc
									key={element.id}
									header={element.fileName}
									date={documentDateFormatted}
									onDownload={() => {
										downloadFile(element.id, element.fileName)
									}}
									onDelete={() => {
										deleteFile(element.id)
									}}
								/>
							)
						})}
						<NewDocument id={id} onUploaded={loadDocuments}/>
					</div>
				</div>
				<div className={classes['work-box']}>
					<h2 className={`${classes['info-header']} ${classes['work-header']}`}>Work information</h2>
				</div>
			</div>
		</main>
	)
}
export default Employee
