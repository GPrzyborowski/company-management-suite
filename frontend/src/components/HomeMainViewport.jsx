import classes from './HomeMainViewport.module.css'

function HomeMainViewport() {
	return (
		<main className={classes.main}>
				<h1 className={classes['main-header']}>Company management suite.</h1>
				<p className={classes['main-paragraph']}>Management suite for small and medium businesses.</p>
		</main>
	)
}

export default HomeMainViewport
