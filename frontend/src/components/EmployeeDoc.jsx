import classes from './EmployeeDoc.module.css'

function EmployeeDoc({header, date}) {
	return (
		<div className={classes.container}>
			<p className={classes.header}>{header}</p>
			<p className={classes.date}>Uploaded: {date}</p>
			<img src="/download.svg" alt="" className={`${classes.icon} ${classes['icon-download']}`}/>
			<img src="/delete.svg" alt="" className={`${classes.icon} ${classes['icon-delete']}`}/>
		</div>
	)
}

export default EmployeeDoc
