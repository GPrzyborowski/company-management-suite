import { useState, useEffect } from 'react'
import HostPanel from './HostPanel'
import NewHostModal from './NewHostModal'
import classes from './ManagementViewport.module.css'
import { API_URL } from '../config/env'

function ManagementViewport() {
	const [confirmVisible, setConfirmVisible] = useState(false)
	const [hostNameValue, setHostNameValue] = useState('')
	const [hosts, setHosts] = useState([])

	const NEW_HOST_ENDPOINT = `${API_URL}/newhost`
	const GET_HOSTS_ENDPOINT = `${API_URL}/gethosts`

	const openModal = () => setConfirmVisible(true)
	const closeModal = () => setConfirmVisible(false)

	const changeHostNameValue = e => {
		setHostNameValue(e.target.value)
	}

	const createNewHost = async () => {
		const res = await fetch(NEW_HOST_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify({
				deviceName: hostNameValue,
			}),
		})
		if (!res.ok) {
			console.error(res)
			return
		}
		await res.json()
		setHostNameValue('')
		closeModal()
		fetchHosts()
	}

	const fetchHosts = async () => {
		const res = await fetch(GET_HOSTS_ENDPOINT, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})

		const data = await res.json()
		setHosts(data)
	}

	useEffect(() => {
		fetchHosts()
	}, [])

	return (
		<main className={classes.main}>
			<HostPanel className={classes.host} onNewHostClick={openModal} hosts={hosts} fetchHosts={fetchHosts}/>
			<NewHostModal
				confirmVisible={confirmVisible}
				onSubmit={createNewHost}
				onCancel={closeModal}
				hostName={hostNameValue}
				onChange={changeHostNameValue}
			/>
		</main>
	)
}

export default ManagementViewport
