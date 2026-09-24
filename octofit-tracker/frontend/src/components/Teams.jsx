import { useEffect, useState } from 'react'
import { fetchItems } from './api.js'

function Teams() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : '/api/teams/'
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    fetchItems(endpoint, controller.signal).then(setTeams).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [endpoint])
  return <section className="resource-section"><div className="section-heading"><div><p className="eyebrow">COMMUNITY</p><h2>Teams</h2></div><span>{teams.length} squads</span></div>{error && <p className="error-message">{error}</p>}<div className="tile-grid">{teams.map((team, index) => <article className="resource-tile" key={team._id || team.id || index}><span className="tile-index">0{index + 1}</span><h3>{team.name || 'Unnamed team'}</h3><p>{team.members?.length || 0} members</p></article>)}</div></section>
}

export default Teams