import { Link } from 'react-router-dom'
import { useState } from 'react'
import classes from './Navigation.module.css'
import BurgerIcon from '../assets/burger_icon.svg'

function Navigation() {
	const [open, setOpen] = useState(false)

	return (
		<nav className={classes.nav}>
			<button className={classes.burger} onClick={() => setOpen(!open)}>
				<img src={BurgerIcon} alt="burger icon" className={classes['burger-bars']} />
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
