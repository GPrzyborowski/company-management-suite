import classes from './ActiveEmployeeCard.module.css'

function ActiveEmployeeCard({name, surname, workStartTime}) {
    return (
        <div className={classes.card}>
            <div className={classes.dot}></div>
            <p className={classes.name}>{name} {surname}</p>
            <p className={classes.time}>{workStartTime}</p>
        </div>
    )
}

export default ActiveEmployeeCard