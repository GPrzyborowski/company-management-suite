import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import classes from './DashboardMain.module.css'
import ActiveEmployeeCard from './ActiveEmployeeCard'

function DashboardMain() {
	const [login, setLogin] = useState('')
	const [activeEmployees, setActiveEmployees] = useState([])

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) {
			return
		}
		try {
			const decoded = jwtDecode(token)
			setLogin(decoded.login)
		} catch (err) {
			console.error(err)
		}
	}, [])

	const getGreeting = () => {
		const hour = new Date().getHours()
		if (hour > 4 && hour < 12) {
			return `Good morning ${login}.`
		} else if (hour > 12 && hour < 19) {
			return `Good afternoon ${login}.`
		} else {
			return `Good evening ${login}.`
		}
	}

	return (
		<main className={classes['dashboard-container']}>
			<h1 className={classes['main-header']}>{getGreeting()}</h1>
			<h2 className={`${classes['active-employees-header']} ${activeEmployees.length == 0 ? classes.hidden : ''}`}>Currently at work</h2>
			<div className={classes['active-employees-container']}></div>
		</main>
	)
}

export default DashboardMain
