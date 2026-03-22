import HostCard from './HostCard'
import NewHostCard from './NewHostCard'
import LoginKeyModal from './LoginKeyModal'
import classes from './HostPanel.module.css'
import { useState } from 'react'
import { API_URL } from '../config/env'

function HostPanel({ onNewHostClick, hosts, fetchHosts }) {
	const [name, setName] = useState('')
	const [loginKeyVisible, setLoginKeyVisible] = useState(false)
	const [loginKey, setLoginKey] = useState('')
	const [codeVisible, setCodeVisible] = useState(false)
	const [expiry, setExpiry] = useState(7)

	const TOGGLE_ENDPOINT = `${API_URL}/togglehost`
	const DEVICE_LOGIN_CODE_ENDPOINT = `${API_URL}/devicelogincode`

	const handleExpiryChange = e => {
		const value = e.target.value
		if (value >= 1 && value <= 30) {
			setExpiry(value)
		} else if (value == '') {
			setExpiry('')
		}
	}

	const showGenerateLoginKey = () => {
		setLoginKeyVisible(true)
	}

	const closeGenerateLoginKey = () => {
		setCodeVisible(false)
		setLoginKeyVisible(false)
	}

	const generateLoginKey = async () => {
		const res = await fetch(DEVICE_LOGIN_CODE_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify({
				deviceId: id,
				expiresInDays: expiry,
			}),
		})
		if (!res.ok) {
			console.error(res)
			return
		}
		const data = await res.json()
		setLoginKey(data.oneTimeCode)
		setCodeVisible(true)
	}

	const toggleActivated = async id => {
		const res = await fetch(`${TOGGLE_ENDPOINT}/${id}`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		if (!res.ok) {
			console.error(res.message)
			return
		}
		await res.json()
		fetchHosts()
	}

	const toggleKeyModal = async () => {
		showGenerateLoginKey()
	}

	return (
		<div className={classes.container}>
			<LoginKeyModal
				name={name}
				visible={loginKeyVisible}
				expiry={expiry}
				onChangeExpiry={handleExpiryChange}
				onGenerate={generateLoginKey}
				onClose={closeGenerateLoginKey}
				codeVisible={codeVisible}
				code={loginKey}
				title="activation"
			/>
			<h2 className={classes.header}>Host devices</h2>
			<div className={classes['device-container']}>
				{hosts.map(host => {
					return (
						<HostCard
							key={host.id}
							hostName={host.deviceName}
							createdDate={host.createdAt}
							isActivated={host.isActive}
							onPowerClick={() => toggleActivated(host.id)}
							onKeyClick={() => {
								setName(host.deviceName)
								toggleKeyModal()
							}}
						/>
					)
				})}
				<NewHostCard onClick={onNewHostClick} />
			</div>
		</div>
	)
}

export default HostPanel
