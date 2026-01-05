import classes from './EmployeeDoc.module.css'

function EmployeeDoc({header, date, size, onDownload, onDelete}) {
	return (
		<div className={classes.container}>
			<p className={classes.header}>{header}</p>
			<p className={classes.date}>Uploaded: {date}</p>
			<p className={classes.size}>{size}</p>
			<button onClick={onDownload} className={classes.btn}><img src="/download.svg" alt="" className={`${classes.icon} ${classes['icon-download']}`}/></button>
			<button onClick={onDelete} className={classes.btn}><img src="/delete.svg" alt="" className={`${classes.icon} ${classes['icon-delete']}`}/></button>
		</div>
	)
}

export default EmployeeDoc
