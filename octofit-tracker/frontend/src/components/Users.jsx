import { useEffect, useState } from 'react'
import { fetchItems } from './api.js'

function Users() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : '/api/users/'
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    fetchItems(endpoint, controller.signal).then(setUsers).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [endpoint])
  return <section className="resource-section"><div className="section-heading"><div><p className="eyebrow">THE CREW</p><h2>Members</h2></div><span>{users.length} profiles</span></div>{error && <p className="error-message">{error}</p>}<ul className="resource-list">{users.map((user, index) => <li className="resource-row" key={user._id || user.id || index}><strong>{user.name || 'Unnamed member'}</strong><span>{user.email || 'No email listed'}</span><span>{user.team?.name || 'Independent'}</span></li>)}</ul></section>
}

export default Users