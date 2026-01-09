import classes from './ConfirmModal.module.css'

function ConfirmModal({visible, onConfirm, onCancel}) {
	if(!visible) {
		return null
	}
	return (
		<div className={classes['modal-overlay']} onClick={onCancel}>
			<div className={classes.modal} onClick={e => e.stopPropagation()}>
				<div className={classes.box}>
					<p className={classes.paragraph}>Are you sure you want to delete this file?</p>
					<div className={classes['btn-box']}>
						<button className={`${classes.btn} ${classes.cancel}`} onClick={onCancel}>Cancel</button>
						<button className={`${classes.btn} ${classes.confirm}`} onClick={onConfirm}>Confirm</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ConfirmModal
