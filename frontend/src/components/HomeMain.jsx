import { Link } from 'react-router-dom'

function HomeMain() {
    return(
        <>
            <h1>Company management suite.</h1>
            <Link to="/register">Register</Link> <br />
            <Link to="/login">Login</Link>
        </>
    )
}

export default HomeMain