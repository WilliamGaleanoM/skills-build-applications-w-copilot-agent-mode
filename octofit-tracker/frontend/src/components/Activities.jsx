import { useEffect, useState } from 'react'
import { fetchItems } from './api.js'

function Activities() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : '/api/activities/'
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchItems(endpoint, controller.signal).then(setActivities).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [endpoint])

  return <ResourceTable title="Recent activities" items={activities} error={error} renderItem={(activity) => (
    <li key={activity._id || activity.id || activity.date} className="resource-row">
      <strong>{activity.type || activity.name || 'Training session'}</strong>
      <span>{activity.user?.name || activity.user || 'Unassigned'}</span>
      <span>{activity.duration ? `${activity.duration} min` : activity.date || 'Today'}</span>
    </li>
  )} />
}

function ResourceTable({ title, items, error, renderItem }) {
  return <section className="resource-section"><div className="section-heading"><div><p className="eyebrow">TRACKER</p><h2>{title}</h2></div><span>{items.length} records</span></div>{error && <p className="error-message">{error}</p>}{!error && items.length === 0 && <p className="empty-message">No records found yet.</p>}<ul className="resource-list">{items.map(renderItem)}</ul></section>
}

export default Activities