import { Link } from 'react-router-dom'
 
export function Home() {
 
    return (
        <section>
            <h2>Home Page</h2>
            <p><Link to="/taskpage">Go to tasks page</Link></p>
        </section>
    )
}
