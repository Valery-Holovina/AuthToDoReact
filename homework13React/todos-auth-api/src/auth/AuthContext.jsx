import {createContext, useContext, useState} from 'react'

const STORAGE_KEY = 'l12-zero-user'
const AuthContext = createContext(null)


function readSavedUser(){
    try{
        const raw = localStorage.getItem(STORAGE_KEY)
        if(!raw) return null

        const value= JSON.parse(raw)
        return typeof value?.id === 'number' && typeof value?.name === 'string' && typeof value?.email === 'string'
        ? value : null
    } catch {
        return null
    }
}

export function AuthProvider({children}){
    const [user, setUser] = useState(readSavedUser)

    async function login(email, password) {
        if(password != 'task123') return false

        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) throw new Error('Error loading users')

        const data = await response.json()
        if (!Array.isArray(data)) throw new Error('Error')

        const found = data.find(
            (item) => typeof item?.email === 'string' && item.email.toLowerCase() === email.trim().toLowerCase(),
        )
        if (!found) return false

        const nextUser = {id: found.id, name: found.name, email: found.email}
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
        setUser(nextUser)
        return true
    }

    function logout() {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

    return(
        <AuthContext.Provider value={{user, isAuth: Boolean(user), login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const value = useContext(AuthContext)
    if (!value) throw new Error("useAuth Error")
    return value
}