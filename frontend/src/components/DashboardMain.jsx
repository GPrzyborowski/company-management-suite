import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import classes from './DashboardMain.module.css'

function DashboardMain() {

    const [login, setLogin] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            return
        }
        try {
            const decoded = jwtDecode(token)
            setLogin(decoded.login)
        } catch(err) {
            console.error(err)
        }
    }, [])

    

    return (
        <main className={classes['dashboard-container']}>
            <h1 className={classes['main-header']}>Hello {login}</h1>
        </main>
    )
}

export default DashboardMain