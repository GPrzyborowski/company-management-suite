import classes from './EditModal.module.css'
import { useState, useEffect } from 'react'
import InputContainer from './InputContainer'

function EditModal({
	editVisible,
	onClose,
	onSubmit,
	firstName,
	lastName,
	birthDate,
	jobStartDate,
	email,
	phone,
	socialSecurity,
	country,
	city,
	postalCode,
	street,
	buildingNumber,
	apartmentNumber,
	bankNumber,
	salaryRate,
	contractType,
	role,
}) {
	const handleSubmit = e => {
		e.preventDefault()
		const dataToSend = {
			firstName,
			lastName,
			birthDate,
			jobStartDate,
			email,
			phone,
			socialSecurity,
			address: {
				country: country,
				city: city,
				postalCode: postalCode,
				street: street,
				buildingNumber: buildingNumber,
				apartmentNumber: apartmentNumber,
			},
			bankNumber,
			salaryRate,
			contractType,
			role,
		}
		onSubmit(dataToSend)
	}

	const [firstNameEdit, setFirstNameEdit] = useState('')
	const [lastNameEdit, setLastNameEdit] = useState('')
	const [birthDateEdit, setBirthDateEdit] = useState('')
	const [jobStartDateEdit, setJobStartDateEdit] = useState('')
	const [emailEdit, setEmailEdit] = useState('')
	const [phoneEdit, setPhoneEdit] = useState('')
	const [socialSecurityEdit, setSocialSecurityEdit] = useState('')
	const [countryEdit, setCountryEdit] = useState('')
	const [cityEdit, setCityEdit] = useState('')
	const [postalCodeEdit, setPostalCodeEdit] = useState('')
	const [streetEdit, setStreetEdit] = useState('')
	const [buildingNumberEdit, setBuildingNumberEdit] = useState('')
	const [apartmentNumberEdit, setApartmentNumberEdit] = useState('')
	const [bankNumberEdit, setBankNumberEdit] = useState('')
	const [salaryRateEdit, setSalaryRateEdit] = useState('')
	const [contractTypeEdit, setContractTypeEdit] = useState('')
	const [roleEdit, setRoleEdit] = useState('')

	const formatDateForInput = dateString => {
		if (!dateString) return ''
		return dateString.split('T')[0]
	}

	useEffect(() => {
		if (!editVisible) return
		setFirstNameEdit(firstName ?? '')
		setLastNameEdit(lastName ?? '')
		setBirthDateEdit(formatDateForInput(birthDate))
		setJobStartDateEdit(formatDateForInput(jobStartDate))
		setEmailEdit(email ?? '')
		setPhoneEdit(phone ?? '')
		setSocialSecurityEdit(socialSecurity ?? '')
		setCountryEdit(country ?? '')
		setCityEdit(city ?? '')
		setPostalCodeEdit(postalCode ?? '')
		setStreetEdit(street ?? '')
		setBuildingNumberEdit(buildingNumber ?? '')
		setApartmentNumberEdit(apartmentNumber ?? '')
		setBankNumberEdit(bankNumber ?? '')
		setSalaryRateEdit(salaryRate ?? '')
		setContractTypeEdit(contractType ?? '')
		setRoleEdit(role ?? '')
	}, [editVisible, birthDate, jobStartDate])

	useEffect(() => {
		if (editVisible) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [editVisible])

	if (!editVisible) {
		return null
	}

	return (
		<div className={classes['modal-overlay']} onClick={onClose}>
			<div className={classes.modal} onClick={e => e.stopPropagation()}>
				<div className={classes.box}>
					<button className={classes.btn} onClick={onClose}>
						<img src="/close.svg" alt="close icon" className={classes['close-icon']} />
					</button>
					<p className={classes.paragraph}>Edit employee information.</p>
					<form onSubmit={handleSubmit} className={classes.form}>
						<InputContainer
							htmlFor="firstName"
							labelText="First name:"
							type="text"
							id="firstName"
							value={firstNameEdit}
							onChange={e => setFirstNameEdit(e.target.value)}
							className={classes['first-name']}
						/>

						<InputContainer
							htmlFor="lastName"
							labelText="Last name:"
							type="text"
							id="lastName"
							value={lastNameEdit}
							onChange={e => setLastNameEdit(e.target.value)}
							className={classes['last-name']}
						/>

						<InputContainer
							htmlFor="birthDate"
							labelText="Birth date:"
							type="date"
							id="birthDate"
							value={birthDateEdit}
							onChange={e => setBirthDateEdit(e.target.value)}
							className={classes['birth-date']}
						/>

						<InputContainer
							htmlFor="jobStartDate"
							labelText="Job start date:"
							type="date"
							id="jobStartDate"
							value={jobStartDateEdit}
							onChange={e => setJobStartDateEdit(e.target.value)}
							className={classes['job-start']}
						/>

						<InputContainer
							htmlFor="email"
							labelText="Email:"
							type="text"
							id="email"
							value={emailEdit}
							onChange={e => setEmailEdit(e.target.value)}
							className={classes['email']}
						/>

						<InputContainer
							htmlFor="phone"
							labelText="Phone number:"
							type="text"
							id="phone"
							value={phoneEdit}
							onChange={e => setPhoneEdit(e.target.value)}
							className={classes['phone']}
						/>

						<InputContainer
							htmlFor="socialSecurity"
							labelText="Social security number:"
							type="text"
							id="socialSecurity"
							value={socialSecurityEdit}
							onChange={e => setSocialSecurityEdit(e.target.value)}
							className={classes['social-security']}
						/>

						<InputContainer
							htmlFor="country"
							labelText="Country:"
							type="text"
							id="country"
							value={countryEdit}
							onChange={e => setCountryEdit(e.target.value)}
							className={classes['country']}
						/>

						<InputContainer
							htmlFor="city"
							labelText="City:"
							type="text"
							id="city"
							value={cityEdit}
							onChange={e => setCityEdit(e.target.value)}
							className={classes['city']}
						/>

						<InputContainer
							htmlFor="postalCode"
							labelText="Postal code:"
							type="text"
							id="postalCode"
							value={postalCodeEdit}
							onChange={e => setPostalCodeEdit(e.target.value)}
							className={classes['postal-code']}
						/>

						<InputContainer
							htmlFor="street"
							labelText="Street:"
							type="text"
							id="street"
							value={streetEdit}
							onChange={e => setStreetEdit(e.target.value)}
							className={classes['street']}
						/>

						<InputContainer
							htmlFor="buildingNumber"
							labelText="Building number:"
							type="text"
							id="buildingNumber"
							value={buildingNumberEdit}
							onChange={e => setBuildingNumberEdit(e.target.value)}
							className={classes['building-number']}
						/>

						<InputContainer
							htmlFor="apartmentNumber"
							labelText="Apartment number:"
							type="text"
							id="apartmentNumber"
							value={apartmentNumberEdit}
							onChange={e => setApartmentNumberEdit(e.target.value)}
							className={classes['apartment-number']}
						/>

						<InputContainer
							htmlFor="bankNumber"
							labelText="Bank account number:"
							type="text"
							id="bankNumber"
							value={bankNumberEdit}
							onChange={e => setBankNumberEdit(e.target.value)}
							className={classes['bank-account']}
						/>

						<InputContainer
							htmlFor="salaryRate"
							labelText="Salary rate:"
							type="text"
							id="salaryRate"
							value={salaryRateEdit}
							onChange={e => setSalaryRateEdit(e.target.value)}
							className={classes['salary-rate']}
						/>

						<InputContainer
							htmlFor="contractType"
							labelText="Contract type:"
							type="text"
							id="contractType"
							value={contractTypeEdit}
							onChange={e => setContractTypeEdit(e.target.value)}
							className={classes['contract-type']}
						/>

						<InputContainer
							htmlFor="role"
							labelText="Role:"
							type="text"
							id="role"
							value={roleEdit}
							onChange={e => setRoleEdit(e.target.value)}
							className={classes['role']}
						/>

						<button type="submit" className={classes['form-btn']}>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default EditModal
