import { useState, useEffect } from 'react'

function Login() {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const tempEndpoint = "http://localhost:5000/api/auth/login"

    async function submit(e) {
        e.preventDefault()
        const res = await fetch(tempEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({login, password})
        })

        const data = await res.json()

        if(res.ok) {
            localStorage.setItem('token', data.jwtToken)
        } else {
            console.error(data.error)
        }
    }

    return (
        <> 
        <form onSubmit={submit}>
            <label htmlFor="login"></label>
            <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)}/> <br />
            <label htmlFor="password"></label>
            <input type="text" id='password' value={password} onChange={(e) => setPassword(e.target.value)}/> <br />
        <button type='submit'>Login</button>
        </form> 
        </>
    )
}

export default Login