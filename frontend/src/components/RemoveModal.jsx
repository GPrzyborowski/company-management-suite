import classes from './ConfirmModal.module.css'
import { useEffect } from 'react'

function RemoveModal({ confirmVisible, onConfirm, onCancel }) {
	useEffect(() => {
		if (confirmVisible) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [confirmVisible])

	if (!confirmVisible) {
		return null
	}
	return (
		<div className={classes['modal-overlay']} onClick={onCancel}>
			<div className={classes.modal} onClick={e => e.stopPropagation()}>
				<div className={classes.box}>
					<p className={classes.paragraph}>Are you sure you want to remove the employee?</p>
					<div className={classes['btn-box']}>
						<button className={`${classes.btn} ${classes.confirm}`} onClick={onConfirm}>
							Confirm
						</button>
						<button className={`${classes.btn} ${classes.cancel}`} onClick={onCancel}>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RemoveModal
