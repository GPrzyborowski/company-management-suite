import { useref } from 'react'
import classes from './NewDocument.module.css'

function NewDocument() {
	return (
		<div className={classes.container}>
			<label>
				Upload
				<input type="file" className={classes.upload} />
			</label>
		</div>
	)
}

export default NewDocument
