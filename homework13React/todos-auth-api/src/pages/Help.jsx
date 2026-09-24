import { Link } from "react-router-dom"
export function Help(){
    return(
        <section>
            <h2>Login to find your tasks</h2>
            <p><Link to="/login">Login</Link></p>
        </section>
    )
}