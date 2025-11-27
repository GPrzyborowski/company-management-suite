import { Link } from 'react-router-dom'
import { useState } from 'react'
import classes from './Navigation.module.css'
import BurgerIconBlue from '../assets/menu_blue.svg'
import BurgerIconWhite from '../assets/menu_white.svg'

function Navigation() {
	const [open, setOpen] = useState(false)
	const burgerIconSource = open ? BurgerIconWhite : BurgerIconBlue

	return (
		<nav className={classes.nav}>
			<button className={classes.burger} onClick={() => setOpen(!open)}>
				<img src={burgerIconSource} alt="burger icon" className={classes['burger-bars']} />
			</button>
			<ul className={`${classes.list} ${open ? `${classes.opened}` : `${classes.closed}`}`}>
				<li className={classes['list-item']}>
					<Link to="/" className={classes['list-item-link']}>
						Home
					</Link>
				</li>
				<li className={classes['list-item']}>
					<Link to="/register" className={classes['list-item-link']}>
						Register
					</Link>
				</li>
				<li className={classes['list-item']}>
					<Link to="/login" className={classes['list-item-link']}>
						Login
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Navigation
