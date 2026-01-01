import { useState, useRef } from 'react'
import classes from './NewDocument.module.css'

function NewDocument({ id }) {
	const inputRef = useRef(null)
	const [isDragging, setIsDragging] = useState(false)

	const handleFile = async newFile => {
		const form = new FormData()
		form.append('file', newFile)
		const res = await fetch(`http://localhost:5000/api/employees/${id}/documents`, {
			method: 'POST',
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			body: form,
		})
		if (res.ok) {
			const created = await res.json()
			console.log(created)
		}
	}

	const onInputChange = e => {
		const file = e.target.files?.[0]
		if (file) handleFile(file)
		e.target.value = ''
	}

	const onDrop = e => {
		e.preventDefault()
		setIsDragging(false)
		const file = e.dataTransfer.files?.[0]
		if (file) handleFile(file)
	}

	const onDragOver = e => {
		e.preventDefault()
		setIsDragging(true)
	}

	const onDragLeave = e => {
		setIsDragging(false)
	}

	return (
		<div
			className={`${classes.container} ${isDragging ? classes.dragging : ''}`}
			onDrop={onDrop}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}>
			<label className={classes.label}>
				<span className={classes.highlight} onClick={() => inputRef.current.click()}>
					Add file
				</span>{' '}
				or drag it to this field.
				<input type="file" className={classes.upload} ref={inputRef} onChange={onInputChange} />
				<div className={classes['icon-container']}>
					<img src="/upload.svg" alt="upload icon" className={classes.icon} />
				</div>
			</label>
		</div>
	)
}

export default NewDocument
