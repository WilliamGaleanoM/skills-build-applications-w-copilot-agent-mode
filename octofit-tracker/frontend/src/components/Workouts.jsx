import { useEffect, useState } from 'react'
import { fetchItems } from './api.js'

function Workouts() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : '/api/workouts/'
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    fetchItems(endpoint, controller.signal).then(setWorkouts).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [endpoint])
  return <section className="resource-section"><div className="section-heading"><div><p className="eyebrow">NEXT SESSION</p><h2>Workout library</h2></div><span>{workouts.length} plans</span></div>{error && <p className="error-message">{error}</p>}<div className="tile-grid">{workouts.map((workout, index) => <article className="resource-tile" key={workout._id || workout.id || index}><span className="tile-index">{workout.difficulty || 'READY'}</span><h3>{workout.title || workout.name || 'Untitled workout'}</h3><p>{workout.description || 'A focused session for your next goal.'}</p></article>)}</div></section>
}

export default Workouts