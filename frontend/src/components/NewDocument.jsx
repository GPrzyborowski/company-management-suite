import { useref } from 'react'
import classes from './NewDocument.module.css'

function NewDocument() {
	return (
		<div className={classes.container}>
			<label>
				Upload a new document
				<input type="file" className={classes.upload} />
                <img src="/upload.svg" alt="" />
			</label>
		</div>
	)
}

export default NewDocument
