import classes from './LoginKeyModal.module.css'
import { useEffect } from 'react'

function LoginKeyModal({ name, surname, confirmVisible, onConfirm, onClose }) {
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
		<div className={classes['modal-overlay']} onClick={onClose}>
			<div className={classes.modal} onClick={e => e.stopPropagation()}>
				<div className={classes.box}>
					<button className={classes.btn} onClick={onClose}>
						<img src="/close.svg" alt="close icon" className={classes['close-icon']} />
					</button>
					<p className={classes.paragraph}>
						Generate login key for {name} {surname}
					</p>
					<div className={classes['btn-box']}>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginKeyModal
