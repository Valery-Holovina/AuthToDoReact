import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export function AppLayout(){
    const {isAuth, logout} = useAuth();
    const navigate = useNavigate();
    const navClass = ({isActive}) => (isActive ? 'nav-link active': 'nav-link')

    function handleLogout(){
        logout()
        navigate('/', {replace: true})
    }

    return(
        <div className="shell">
            <header className="header">
                <h1>Homework</h1>
                <nav className="nav" aria-label="Main">
                 <NavLink to="/" end className={navClass}>Home</NavLink>

                    {isAuth ? (
                        <>
                            <NavLink to="/account" className={navClass}>Account</NavLink>
                            <NavLink to="/taskpage" className={navClass}>
                                My Tasks
                            </NavLink>
                            <button type="button" className="nav-link" onClick={handleLogout}>Logout</button>
                    </>
                    ): (
                        <>
                            <NavLink to="/login" className={navClass}>Login</NavLink>
                            <NavLink to="/help" className={navClass}>Help</NavLink>
                        </>
                    )}
        
                </nav>
            </header>
            <main className="panel">
                    <Outlet />
            </main>
        </div>
    )
}