import classes from './WarningMsg.module.css'

function WarningMsg({children}) {
    return (
        <p className={classes.warning}>{children}</p>
    )
}

export default WarningMsg