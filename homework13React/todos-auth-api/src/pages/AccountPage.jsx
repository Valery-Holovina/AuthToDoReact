import { useAuth } from '../auth/AuthContext.jsx'
 
export function Account() {

  const { user } = useAuth()
 
  return (
<section>
<h2>Account</h2>
<p>Data</p>
<dl className="facts">
<dt>ID</dt><dd>{user.id}</dd>
<dt>Name</dt><dd>{user.name}</dd>
<dt>Email</dt><dd>{user.email}</dd>
</dl>
</section>

  )

}