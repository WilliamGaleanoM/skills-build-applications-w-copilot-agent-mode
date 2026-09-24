import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">OCTOFIT / TRAINING CONSOLE</p>
          <h1>Move with purpose.</h1>
        </div>
        <span className="status-dot">API connected</span>
      </header>
      <nav className="app-nav" aria-label="Main navigation">
        <NavLink end to="/">Overview</NavLink>
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/users">Members</NavLink>
        <NavLink to="/workouts">Workouts</NavLink>
      </nav>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function Overview() {
  return (
    <section className="overview">
      <div className="overview-copy">
        <p className="eyebrow">WEEKLY PULSE</p>
        <h2>Your training, in one clear view.</h2>
        <p>Track the work, find your people, and keep the next session close.</p>
        <NavLink className="primary-link" to="/activities">View activity</NavLink>
      </div>
      <div className="overview-stat">
        <span>06</span>
        <small>active routes</small>
      </div>
    </section>
  )
}

export default App
