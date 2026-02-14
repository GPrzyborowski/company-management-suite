import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import classes from './Navigation.module.css'
import BurgerIcon from '../assets/burger_icon.svg'

function Navigation() {
	const [open, setOpen] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [visible, setVisible] = useState(true)

	useEffect(() => {
		const token = localStorage.getItem('token')
		token ? setIsLoggedIn(true) : setIsLoggedIn(false)
	}, [])

	const navigate = useNavigate()

	function logoutHandler() {
		localStorage.removeItem('token')
		navigate('/')
	}

	let previousScrollPosition = window.pageYOffset

	window.onscroll = () => {
		const currentScrollPosition = window.pageYOffset
		previousScrollPosition > currentScrollPosition ? setVisible(true) : setVisible(false)
	}

	return (
		<nav className={`${classes.nav} ${visible ? '' : classes.hidden}`}>
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
						<li className={classes['list-item']}>
							<NavLink
								to="/register"
								className={({ isActive }) => `${classes['list-item-link']} ${isActive ? classes.active : ''}`}>
								Register
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
								to="/employees"
								className={({ isActive }) => `${classes['list-item-link']} ${isActive ? classes.active : ''}`}>
								Employees
							</NavLink>
						</li>
						<li className={classes['list-item']}>
							<button
								className={`${classes['list-item-link']} ${classes['list-item-link-logout']}`}
								onClick={logoutHandler}>
								Log out
							</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	)
}

export default Navigation
