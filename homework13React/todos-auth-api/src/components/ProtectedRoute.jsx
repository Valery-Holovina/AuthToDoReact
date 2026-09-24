import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '../auth/AuthContext.jsx'

export function ProtectedRoute(){
    const {isAuth} = useAuth();
    const location = useLocation();

    if(isAuth) return <Outlet />
    return <Navigate to= "/login" state={{from: location}} replace></Navigate>
}