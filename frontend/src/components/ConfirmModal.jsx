import classes from './ConfirmModal.module.css'

function ConfirmModal() {
	return (
		<div className={classes['modal-overlay']}>
			<div className={classes.modal}>
				<div className={classes.box}>
					<p className={classes.paragraph}>Are you sure you want to delete this file?</p>
					<div className={classes['btn-box']}>
						<button className={`${classes.btn} ${classes.cancel}`}>Cancel</button>
						<button className={`${classes.btn} ${classes.confirm}`}>Confirm</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ConfirmModal
