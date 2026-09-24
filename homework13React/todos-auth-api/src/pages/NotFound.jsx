import { Link } from "react-router-dom"
export function NotFound(){
    return(
        <section>
            <h2>The Page is Not Found</h2>
            <p><Link to="/">Go home</Link></p>
        </section>
    )
}