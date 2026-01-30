import classes from './LoginKeyModal.module.css'
import { useEffect, useState } from 'react'

function LoginKeyModal({ name, surname, visible, expiry, onChangeExpiry, onGenerate, onClose, codeVisible, code }) {

	const [wasCopied, setWasCopied] = useState(false)

	useEffect(() => {
		if (visible) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [visible])

	if (!visible) {
		return null
	}

	const handleCopy = async () => {
		if(code != '') {
			await navigator.clipboard.writeText(code)
		}
		setWasCopied(true)
	}

	return (
		<div className={classes['modal-overlay']} onClick={onClose}>
			<div className={classes.modal} onClick={e => e.stopPropagation()}>
				<div className={classes.box}>
					<button className={classes.btn} onClick={onClose}>
						<img src="/close.svg" alt="close icon" className={classes['close-icon']} />
					</button>
					<p className={classes.paragraph}>
						Generate login key for{' '}
						<span className={classes.bold}>
							{name} {surname}
						</span>
					</p>
					<label className={classes['expire-label']} htmlFor="expire">
						Set expiration (1-30 days):
					</label>
					<input
						className={classes['expire-input']}
						type="number"
						id="expire"
						name="expire"
						min="1"
						max="30"
						value={expiry}
						onChange={onChangeExpiry}></input>
					<div className={classes['generate-container']}>
						<button className={classes['generate-btn']} onClick={onGenerate}>
							Generate
						</button>
						<div className={`${classes['code-container']} ${codeVisible ? '' : classes['code-visible']}`}>
							<p className={classes['generate-code']}>
								<span className={classes.bold}>Code: </span>
								{code}
							</p>
							<button className={classes.copy} onClick={handleCopy}>
								<img src={wasCopied ? '/check.svg' : '/copy.svg' } alt="copy icon" className={classes['copy-icon']} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginKeyModal
