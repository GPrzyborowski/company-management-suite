import EmployeeDoc from './EmployeeDoc'
import NewDocument from './NewDocument'
import ConfirmModal from './ConfirmModal'
import EditModal from './EditModal'
import RemoveModal from './RemoveModal'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import classes from './Employee.module.css'

function Employee() {
	const { id } = useParams()

	const navigate = useNavigate()

	const [employee, setEmployee] = useState('')
	const [documents, setDocuments] = useState([])
	const [confirmVisible, setConfirmVisible] = useState(false)
	const [removeVisible, setRemoveVisible] = useState(false)
	const [editVisible, setEditVisible] = useState(false)
	const [docToDelete, setDocToDelete] = useState(null)

	const employeeEndpoint = `http://localhost:5000/api/employees/${id}`
	const editEndpoint = `http://localhost:5000/api/employees/${id}`
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

	const deleteFile = id => {
		setDocToDelete(id)
		setConfirmVisible(true)
	}

	const cancelDelete = () => {
		setConfirmVisible(false)
		setDocToDelete(null)
	}

	const confirmDelete = async () => {
		const res = await fetch(`http://localhost:5000/api/documents/${docToDelete}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		if (res.ok) {
			loadDocuments()
		}
		setConfirmVisible(false)
		setDocToDelete(null)
	}

	const openEdit = async () => {
		setEditVisible(true)
	}

	const closeEdit = async () => {
		setEditVisible(false)
	}

	const submitEdit = async data => {
		const res = await fetch(editEndpoint, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify(data),
		})
		if (!res.ok) {
			console.error('Update failed.')
			return
		}
		const updatedEmployee = await res.json()
		setEmployee(updatedEmployee)
		setEditVisible(false)
	}

	const removeEmployee = () => {
		setRemoveVisible(true)
	}

	const cancelRemove = () => {
		setRemoveVisible(false)
	}

	const confirmRemove = async () => {
		const res = await fetch(employeeEndpoint, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		if (res.ok) {
			setRemoveVisible(false)
			navigate('/employees')
		}
	}

	return (
		<>
			<ConfirmModal confirmVisible={confirmVisible} onConfirm={confirmDelete} onCancel={cancelDelete} />
			<RemoveModal confirmVisible={removeVisible} onConfirm={confirmRemove} onCancel={cancelRemove} />
			<EditModal
				editVisible={editVisible}
				onClose={closeEdit}
				onSubmit={submitEdit}
				firstName={employee.firstName}
				lastName={employee.lastName}
				birthDate={employee.birthDate}
				jobStartDate={employee.jobStart}
				email={employee.email}
				phone={employee.phoneNumber}
				socialSecurity={employee.socialNumber}
				country={employee?.address?.country}
				city={employee?.address?.city}
				postalCode={employee?.address?.postalCode}
				street={employee?.address?.street}
				buildingNumber={employee?.address?.buildingNumber}
				apartmentNumber={employee?.address?.apartmentNumber}
				bankNumber={employee.bankAccount}
				salaryRate={employee.salaryRate}
				contractType={employee.contractType}
				role={employee.position}></EditModal>
			<main className={classes.main}>
				<div className={classes.box}>
					<div className={classes['info-box']}>
						<div className={classes['header-box']}>
							<h2 className={`${classes['info-header']} ${classes['employee-header']}`}>
								Employee: {employee.firstName} {employee.lastName}
							</h2>
						</div>

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
							{employee?.address?.street} {employee?.address?.buildingNumber}
							{employee?.address?.apartmentNumber ? ` / ${employee.address.apartmentNumber}` : ''}
						</p>
						<p className={classes.info}>
							<span className={classes['info-label']}>Postal code: </span>
							{employee?.address?.postalCode}
						</p>
						<div className={classes['modifier-container']}>
							<button className={classes.remove} onClick={removeEmployee}>
								<img src="/user-x.svg" alt="remove icon" className={classes['edit-icon']} />
							</button>
							<button className={classes.edit} onClick={openEdit}>
								<img src="/edit.svg" alt="edit icon" className={classes['edit-icon']} />
							</button>
							<button className={classes.edit}>
								<img src="/key.svg" alt="key icon" className={classes['edit-icon']} />
							</button>
						</div>
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
										size={`${(element.size / 1000000).toFixed(1)} MB`}
										onDownload={() => {
											downloadFile(element.id, element.fileName)
										}}
										onDelete={() => {
											deleteFile(element.id)
										}}
									/>
								)
							})}
							<NewDocument id={id} onUploaded={loadDocuments} />
						</div>
					</div>
					<div className={classes['work-box']}>
						<h2 className={`${classes['info-header']} ${classes['work-header']}`}>Work information</h2>
					</div>
				</div>
			</main>
		</>
	)
}
export default Employee
