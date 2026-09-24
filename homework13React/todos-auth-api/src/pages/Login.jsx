import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
 
 
 
export function Login() {
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [pending, setPending] = useState(false)
 
    const { isAuth, login } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from ?? '/account'
 
    if (isAuth) return <Navigate to={from} replace />
 
    async function handleSubmit(event) {
        event.preventDefault()
        setPending(true)
        setError('')
 
        try {
            const success = await login(email, password)
            if (!success) {
                setError('Password or email error')
                return
            }
            navigate(from, { replace: true })
        } catch {
            setError('Error API')
        } finally {
            setPending(false)
        }
    }
 
 
    return (
        <section>
            <h2>Login</h2>
            <p>Data: <strong>Sincere@april.biz</strong> / <strong>task123</strong></p>
            <form className="form" onSubmit={handleSubmit}>
                <label>Email
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                </label>
                <label>Пароль
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                </label>
                <button type="submit" disabled={pending}>{pending ? 'Завантаження...' : 'Увійти'}</button>
            </form>
            {error && <p className="error" role="alert">{error}</p>}
        </section>
    )
}