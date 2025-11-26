import classes from './LinkButton.module.css'

function LinkButton({variant, children, onClick}) {

    const chosenClass = classes[variant] || ''
    
    return (
        <a className={`${classes.button} ${chosenClass}`} onClick={onClick}>
            {children}
        </a>
    )
}

export default LinkButton