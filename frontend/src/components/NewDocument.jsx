import { useState, useRef } from 'react'
import classes from './NewDocument.module.css'

function NewDocument() {
	const inputRef = useRef(null)
	const [files, setFiles] = useState([])
	const [isDragging, setIsDragging] = useState(false)

	const handleFiles = newFiles => {
		setFiles(newFiles)
	}

	const onInputChange = e => {
		handleFiles(e.target.files)
		e.target.value = ''
	}

	const onDrop = e => {
		e.preventDefault()
		setIsDragging(false)
		handleFiles(e.dataTransfer.files)
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
				<input type="file" className={classes.upload} ref={inputRef} onChange={onInputChange} multiple />
				<div className={classes['icon-container']}>
					<img src="/upload.svg" alt="upload icon" className={classes.icon} />
				</div>
			</label>
		</div>
	)
}

export default NewDocument
