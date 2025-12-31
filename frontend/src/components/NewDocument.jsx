import { useref } from 'react'
import classes from './NewDocument.module.css'

function NewDocument() {
	return (
		<div className={classes.container}>
			<label className={classes.label}>
				<span className={classes.highlight}>Add file</span> or drag it to this field.
				<input type="file" className={classes.upload} />
                <div className={classes['icon-container']}>
					<img src="/upload.svg" alt="upload icon" className={classes.icon}/>
				</div>
			</label>
		</div>
	)
}

export default NewDocument
