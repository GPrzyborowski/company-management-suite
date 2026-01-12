import classes from './EditModal.module.css'
import { useState } from 'react'
import InputContainer from './InputContainer'

function EditModal({ visible, onSubmit, onCancel }) {

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

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [birthDate, setBirthDate] = useState('')
	const [jobStartDate, setJobStartDate] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [socialSecurity, setSocialSecurity] = useState('')
	const [country, setCountry] = useState('')
	const [city, setCity] = useState('')
	const [postalCode, setPostalCode] = useState('')
	const [street, setStreet] = useState('')
	const [buildingNumber, setBuildingNumber] = useState('')
	const [apartmentNumber, setApartmentNumber] = useState('')
	const [bankNumber, setBankNumber] = useState('')
	const [salaryRate, setSalaryRate] = useState('')
	const [contractType, setContractType] = useState('')
	const [role, setRole] = useState('')

	return (
		<div className={classes['modal-overlay']} onClick={onCancel}>
			<div className={classes.modal} onClick={e => e.stopPropagation()}>
				<div className={classes.box}>
					<img src="/close.svg" alt="close icon" className={classes['close-icon']}/>
					<p className={classes.paragraph}>Edit employee information.</p>
					<form onSubmit={handleSubmit} className={classes.form}>
						<InputContainer
							htmlFor="firstName"
							labelText="First name:"
							type="text"
							id="firstName"
							value={firstName}
							onChange={e => setFirstName(e.target.value)}
							className={classes['first-name']}
						/>

						<InputContainer
							htmlFor="lastName"
							labelText="Last name:"
							type="text"
							id="lastName"
							value={lastName}
							onChange={e => setLastName(e.target.value)}
							className={classes['last-name']}
						/>

						<InputContainer
							htmlFor="birthDate"
							labelText="Birth date:"
							type="date"
							id="birthDate"
							value={birthDate}
							onChange={e => setBirthDate(e.target.value)}
							className={classes['birth-date']}
						/>

						<InputContainer
							htmlFor="jobStartDate"
							labelText="Job start date:"
							type="date"
							id="jobStartDate"
							value={jobStartDate}
							onChange={e => setJobStartDate(e.target.value)}
							className={classes['job-start']}
						/>

						<InputContainer
							htmlFor="email"
							labelText="Email:"
							type="text"
							id="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							className={classes['email']}
						/>

						<InputContainer
							htmlFor="phone"
							labelText="Phone number:"
							type="text"
							id="phone"
							value={phone}
							onChange={e => setPhone(e.target.value)}
							className={classes['phone']}
						/>

						<InputContainer
							htmlFor="socialSecurity"
							labelText="Social security number:"
							type="text"
							id="socialSecurity"
							value={socialSecurity}
							onChange={e => setSocialSecurity(e.target.value)}
							className={classes['social-security']}
						/>

						<InputContainer
							htmlFor="country"
							labelText="Country:"
							type="text"
							id="country"
							value={country}
							onChange={e => setCountry(e.target.value)}
							className={classes['country']}
						/>

						<InputContainer
							htmlFor="city"
							labelText="City:"
							type="text"
							id="city"
							value={city}
							onChange={e => setCity(e.target.value)}
							className={classes['city']}
						/>

						<InputContainer
							htmlFor="postalCode"
							labelText="Postal code:"
							type="text"
							id="postalCode"
							value={postalCode}
							onChange={e => setPostalCode(e.target.value)}
							className={classes['postal-code']}
						/>

						<InputContainer
							htmlFor="street"
							labelText="Street:"
							type="text"
							id="street"
							value={street}
							onChange={e => setStreet(e.target.value)}
							className={classes['street']}
						/>

						<InputContainer
							htmlFor="buildingNumber"
							labelText="Building number:"
							type="text"
							id="buildingNumber"
							value={buildingNumber}
							onChange={e => setBuildingNumber(e.target.value)}
							className={classes['building-number']}
						/>

						<InputContainer
							htmlFor="apartmentNumber"
							labelText="Apartment number:"
							type="text"
							id="apartmentNumber"
							value={apartmentNumber}
							onChange={e => setApartmentNumber(e.target.value)}
							className={classes['apartment-number']}
						/>

						<InputContainer
							htmlFor="bankNumber"
							labelText="Bank account number:"
							type="text"
							id="bankNumber"
							value={bankNumber}
							onChange={e => setBankNumber(e.target.value)}
							className={classes['bank-account']}
						/>

						<InputContainer
							htmlFor="salaryRate"
							labelText="Salary rate:"
							type="text"
							id="salaryRate"
							value={salaryRate}
							onChange={e => setSalaryRate(e.target.value)}
							className={classes['salary-rate']}
						/>

						<InputContainer
							htmlFor="contractType"
							labelText="Contract type:"
							type="text"
							id="contractType"
							value={contractType}
							onChange={e => setContractType(e.target.value)}
							className={classes['contract-type']}
						/>

						<InputContainer
							htmlFor="role"
							labelText="Role:"
							type="text"
							id="role"
							value={role}
							onChange={e => setRole(e.target.value)}
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
