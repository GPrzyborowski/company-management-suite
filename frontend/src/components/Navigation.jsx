import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import classes from './Navigation.module.css'
import BurgerIcon from '../assets/burger_icon.svg'

function Navigation() {
	const [open, setOpen] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		const token = localStorage.getItem('token')
		token ? setIsLoggedIn(true) : setIsLoggedIn(false)
	}, [])

	return (
		<nav className={classes.nav}>
			<button className={classes.burger} onClick={() => setOpen(!open)}>
				<img src={BurgerIcon} alt="burger icon" className={classes['burger-bars']} />
			</button>
			<ul className={`${classes.list} ${open ? `${classes.opened}` : `${classes.closed}`}`}>
				{!isLoggedIn && (
					<>
						<li className={classes['list-item']}>
							<NavLink
								to="/"
								className={({ isActive }) => `${classes['list-item-link']} ${isActive ? classes.active : ''}`}>
								Home
							</NavLink>
						</li>
						<li className={classes['list-item']}>
							<NavLink
								to="/login"
								className={({ isActive }) => `${classes['list-item-link']} ${isActive ? classes.active : ''}`}>
								Login
							</NavLink>
						</li>
					</>
				)}

				{isLoggedIn && (
					<>
						<li className={classes['list-item']}>
							<NavLink
								to="/dashboard"
								className={({ isActive }) => `${classes['list-item-link']} ${isActive ? classes.active : ''}`}>
								Dashboard
							</NavLink>
						</li>
						<li className={classes['list-item']}>
							<NavLink
								to="/newemployee"
								className={({ isActive }) => `${classes['list-item-link']} ${isActive ? classes.active : ''}`}>
								New employee
							</NavLink>
						</li>
					</>
				)}
			</ul>
		</nav>
	)
}

export default Navigation
