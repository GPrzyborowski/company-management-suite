import classes from './EmployeesViewport.module.css'

function EmployeesViewport({children}) {
    return (
        <main className={classes.main}>
            {children}
        </main>
    )
}

export default EmployeesViewport