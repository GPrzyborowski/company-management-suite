import EmployeeCard from '../components/EmployeeCard'
import classes from './EmployeesMain.module.css'

function EmployeesMain() {
    return (
        <main className={classes.main}>
            <EmployeeCard />
        </main>
    )
}

export default EmployeesMain