import classes from './ActiveEmployeeCard.module.css'

function ActiveEmployeeCard({name, surname, workStartTime}) {
    return (
        <div className={classes.card}>
            <div className={classes.dot}></div>
            <div>
                <img src="user icon" alt="/user.svg" />
                <p className={classes.name}>{name} {surname}</p>
            </div>
            <p className={classes.time}>Clock-in: {workStartTime}</p>
        </div>
    )
}

export default ActiveEmployeeCard