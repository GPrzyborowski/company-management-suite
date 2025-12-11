import classes from './InputContainer.module.css'

function InputContainer({htmlFor, labelText, type, id, value, onChange}) {

	return (
		<>
			<label htmlFor={htmlFor} className={classes['form-label']}>
				{labelText}
			</label>
			<input
				type={type}
				id={id}
				className={classes['form-input']}
				value={value}
				onChange={onChange}
			/>
		</>
	)
}

export default InputContainer