import { useState, useEffect } from 'react'
import HostPanel from './HostPanel'
import NewHostModal from './NewHostModal'
import classes from './ManagementViewport.module.css'

function ManagementViewport() {
	const localEndpointPost = `http://localhost:5000/api/newhost`
	const localEndpointGet = `http://localhost:5000/api/gethosts`

	const [confirmVisible, setConfirmVisible] = useState(false)
	const [hostNameValue, setHostNameValue] = useState('')
	const [hosts, setHosts] = useState([])

	const openModal = () => setConfirmVisible(true)
	const closeModal = () => setConfirmVisible(false)

	const changeHostNameValue = e => {
		setHostNameValue(e.target.value)
	}

	const createNewHost = async () => {
		const res = await fetch(localEndpointPost, {
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
		const res = await fetch(localEndpointGet, {
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
			<HostPanel className={classes.host} onNewHostClick={openModal} hosts={hosts} />
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
