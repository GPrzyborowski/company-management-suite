import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import classes from './DashboardMain.module.css'

function DashboardMain() {
	const [login, setLogin] = useState('')

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
        if((hour > 4) && (hour < 12)) {
            return `Good morning ${login}.`
        } else if((hour > 12) && (hour < 19)) {
            return `Good afternoon ${login}.`
        } else {
            return `Good evening ${login}.`
        }
    }

	return (
		<main className={classes['dashboard-container']}>
			<h1 className={classes['main-header']}>{getGreeting()}</h1>
		</main>
	)
}

export default DashboardMain
