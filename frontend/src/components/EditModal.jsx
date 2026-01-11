import classes from './EditModal.module.css'

function EditModal({visible, onConfirm, onCancel}) {
	return (
		<div className={classes['modal-overlay']} onClick={onCancel}>
			<div className={classes.modal} onClick={e => e.stopPropagation()}>
				<div className={classes.box}>
					<p className={classes.paragraph}>Edit employee information.</p>
				</div>
			</div>
		</div>
	)
}

export default EditModal
