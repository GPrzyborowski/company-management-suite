import classes from './EmployeeDoc.module.css'

function EmployeeDoc({header, date, onDownload}) {
	return (
		<div className={classes.container}>
			<p className={classes.header}>{header}</p>
			<p className={classes.date}>Uploaded: {date}</p>
			<button onClick={onDownload}><img src="/download.svg" alt="" className={`${classes.icon} ${classes['icon-download']}`}/></button>
			<button><img src="/delete.svg" alt="" className={`${classes.icon} ${classes['icon-delete']}`}/></button>
		</div>
	)
}

export default EmployeeDoc
