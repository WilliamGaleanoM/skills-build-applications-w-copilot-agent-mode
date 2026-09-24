import { useEffect, useState } from 'react'
import { fetchItems } from './api.js'

function Leaderboard() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : '/api/leaderboard/'
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    fetchItems(endpoint, controller.signal).then(setEntries).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [endpoint])
  return <section className="resource-section"><div className="section-heading"><div><p className="eyebrow">COMPETITION</p><h2>Leaderboard</h2></div><span>{entries.length} athletes</span></div>{error && <p className="error-message">{error}</p>}<ol className="leaderboard-list">{entries.map((entry, index) => <li key={entry._id || entry.id || index}><span className="rank">{String(index + 1).padStart(2, '0')}</span><strong>{entry.user?.name || entry.name || 'Athlete'}</strong><span className="points">{entry.points || 0} pts</span></li>)}</ol></section>
}

export default Leaderboard